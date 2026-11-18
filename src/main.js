import './style.css';
const topics = [
{title:'Biology as a Science of Life',year:'Year 2',icon:'✳',desc:'Build your foundation: what biology studies, how scientists investigate, and how living things are organised.',tags:['Foundations','Scientific method']},
{title:'Cells & Cell Processes',year:'Year 2',icon:'◉',desc:'Explore cell structure, organelles, and the processes that keep cells alive.',tags:['Cytology','Cell structure']},
{title:'Diversity of Living Things',year:'Year 3',icon:'⌘',desc:'Discover how living organisms are grouped, compared, and adapted to their environments.',tags:['Classification','Biodiversity']},
{title:'Animal & Plant Systems',year:'Year 3',icon:'❋',desc:'Learn how systems in plants and animals work together to sustain life.',tags:['Systems','Functions']}
];
const app=document.querySelector('#app');
app.innerHTML=`
<header class="top"><div class="brand"><span class="brand-mark">b.</span><span>BioLearn</span></div><nav><a href="#library">Library</a><a href="#progress">My progress</a></nav><button class="profile" aria-label="Profile">F</button></header>
<main>
<section class="hero"><div class="eyebrow">YOUR BIOLOGY STUDY SPACE</div><h1>Biology, made<br><em>clear.</em></h1><p>Learn at your own pace. Understand the concepts. Get ready for class and exams.</p><button class="primary" id="start">Start learning <span>↗</span></button><div class="hero-art" aria-hidden="true"><div class="orbit o1"></div><div class="orbit o2"></div><div class="cell"><div class="nucleus"></div><span class="cell-dot d1"></span><span class="cell-dot d2"></span><span class="cell-dot d3"></span></div><span class="art-label">CELL / 01</span></div></section>
<section class="section" id="library"><div class="section-head"><div><div class="eyebrow">LEARNING LIBRARY</div><h2>Explore your materials</h2></div><span class="muted">Year 2 + Year 3</span></div><div class="cards"> </div></section>
<section class="section progress" id="progress"><div class="progress-box"><div><div class="eyebrow">YOUR JOURNEY</div><h2>Small steps.<br>Real understanding.</h2><p>Lessons, quick checks, revision and progress tracking will live here as your library is connected.</p></div><div class="progress-circle"><span>0%</span><small>START</small></div></div></section>
<footer><span>BioLearn</span><span>Built for curious minds · Ghana SHS Biology</span></footer>
</main>`;
const cards=document.querySelector('.cards');
cards.innerHTML=topics.map((t,i)=>`<article class="topic-card" data-topic="${i}"><div class="card-top"><span class="topic-icon">${t.icon}</span><span class="year">${t.year}</span></div><h3>${t.title}</h3><p>${t.desc}</p><div class="tags">${t.tags.map(x=>`<span>${x}</span>`).join('')}</div><button class="card-link" data-topic="${i}">Explore topic <span>↗</span></button></article>`).join('');
function openTopic(i){const t=topics[i];alert(`${t.title}\n\n${t.desc}\n\nThis lesson will be populated from the learner-material PDFs. Upload/processing is the next step; no textbook content is invented here.`)}
document.querySelectorAll('[data-topic]').forEach(el=>el.addEventListener('click',()=>openTopic(Number(el.dataset.topic))));
document.querySelector('#start').addEventListener('click',()=>document.querySelector('#library').scrollIntoView({behavior:'smooth'}));
