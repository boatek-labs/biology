export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Use POST'});
 try{
  const {message,topic,materialContext}=req.body||{};
  if(!message?.trim()) return res.status(400).json({error:'Write a question first.'});
  if(!process.env.GEMINI_API_KEY) return res.status(503).json({error:'Tutor is not configured. Add GEMINI_API_KEY in Vercel Environment Variables.'});
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
  const prompt=`You are BioLearn, a patient Ghana SHS Biology teacher. Teach a Form 3 learner in clear, exam-friendly language. Use supplied material context only for textbook-specific facts; if insufficient, clearly label general biology knowledge. Topic: ${topic||'Biology'}. Context: ${materialContext||'No textbook excerpt supplied'}. Question: ${message}`;
  const upstream=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.4,maxOutputTokens:1200}})});
  const data=await upstream.json();
  if(!upstream.ok) return res.status(502).json({error:data?.error?.message||'Gemini request failed'});
  const answer=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
  if(!answer) return res.status(502).json({error:'Gemini returned an empty response'});
  return res.status(200).json({answer});
 }catch(e){return res.status(500).json({error:'Tutor request failed',detail:e.message});}
}
