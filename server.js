import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(express.json({limit:'1mb'}));
app.use(express.static('dist'));
app.post('/api/tutor', async (req,res)=>{
  try{
    const {message,topic,materialContext}=req.body||{};
    if(!message?.trim()) return res.status(400).json({error:'Write a question first.'});
    const key=process.env.GEMINI_API_KEY;
    if(!key) return res.status(503).json({error:'Tutor is not configured yet. Add GEMINI_API_KEY to your environment.'});
    const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
    const prompt=`You are BioLearn, a patient Ghana SHS Biology teacher. Help a Form 3 learner understand Biology in clear, exam-ready language. Use the supplied material context only for textbook-specific facts. If the context is insufficient, say so and clearly label general biology knowledge. Use short headings, examples, and a quick check when helpful. Topic: ${topic||'Biology'}. Material context: ${materialContext||'No PDF lesson excerpt supplied.'}. Learner question: ${message}`;
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.4,maxOutputTokens:1200}})});
    const data=await response.json();
    if(!response.ok) return res.status(502).json({error:data?.error?.message||'Gemini request failed'});
    const answer=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
    if(!answer) return res.status(502).json({error:'Gemini returned an empty answer.'});
    res.json({answer});
  }catch(e){res.status(500).json({error:'Tutor request failed. Try again.',detail:e.message});}
});
const port=process.env.PORT||3001;
app.listen(port,()=>console.log('BioLearn local server running on '+port));
