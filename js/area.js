const colorMax=d3.scaleOrdinal(["#f6d2d5","#f0b7bc","#ea969d","#e16973","#cc0011","#a2000d","#b8000f"]),colorMin=d3.scaleOrdinal(["#004d84","#005da0","#006bb7","#0077cc","#4a9eda","#7db9e5","#a5cfed"]),colores=[colorMax,colorMin],widthMobile=window.innerWidth>0?window.innerWidth:screen.width,csvForce=["csv/total-records-max.csv","csv/total-records-min.csv"],records=["maxima","minima"],maxmin=["max","min"];function formatDate(){const t=new Date,e=t.getDate(),a=t.getMonth()+1;document.getElementById("updateButtonDay").value=e,document.getElementById("updateButtonMonth").value=a}function forceLayout(t,e,a){const c=d3.select(`.chart-force-${e}`),n=c.select("svg"),s=1.5;let r;const o=c.append("div").attr("class","tooltip tooltip-record").style("opacity",0),i=c.append("div").attr("class","tooltip tooltip-decade").style("opacity",0);function l(r){const l=c.node().offsetWidth;n.attr("width",l).attr("height",600);const d=n.selectAll(`.circle-${e}`).remove().exit().data(r).enter().append("circle").attr("class",`circle-${e}`).attr("r",t=>t.radius).attr("fill",t=>a(t.decade)).attr("cx",t=>t.x).attr("cy",t=>t.y).on("mouseover",function(t){const a=this;d3.selectAll(`.circle-${e}`).filter(function(t,e){return this!==a}).transition().duration(300).ease(d3.easeLinear).style("opacity",.1),o.transition(),o.style("opacity",1).html(`<p class="tooltip-record-max">En <span class="number">${t.year}</span> se establecieron <span class="number">${t.total}</span> récords.<p/>\n                        `)}).on("mouseout",()=>{d3.selectAll(`.circle-${e}`).transition().duration(800).ease(d3.easeLinear).style("opacity",1),o.transition().duration(200).style("opacity",0)});d3.forceSimulation().force("forceX",d3.forceX().x(.5*l)).force("forceY",d3.forceY().y(300)).force("center",d3.forceCenter().x(.5*l).y(300)).force("charge",d3.forceManyBody().strength(5)).force("collision",d3.forceCollide().radius(t=>t.radius+1)).nodes(r).force("collide",d3.forceCollide().strength(.5).radius(t=>t.radius+s).iterations(1)).on("tick",()=>d.attr("cx",({x:t})=>t).attr("cy",({y:t})=>t));const p=d3.group(r.map(t=>t.decade));let m=p.filter((t,e)=>p.indexOf(t)===e);m=m.reverse(t=>t.decade);const u=n.selectAll(`.legend-${e}`).remove().exit().data(m,t=>t).enter().append("g").attr("class",`legend-${e}`).attr("year",t=>t);function y(a){const c=a.attr("year");d3.csv(t,(t,a)=>{const n=a.filter(t=>String(t.decade).match(c));i.data(n).style("opacity",1).html(t=>`<p class="tooltip-record-max">Entre <span class="number">${t.decade}</span> y <span class="number">${Number(t.decade)+9}</span> se establecieron <span class="number">${t.totaldecade}</span> récords de temperatura ${e}.<p/>`)})}widthMobile>544?(u.attr("transform",(t,e)=>`translate(50,${25*(e+5)})`),u.append("text").attr("x",20).attr("y",10).text(t=>t)):(u.attr("transform",(t,e)=>`translate(${45*e},50)`),u.append("text").attr("x",14).attr("y",9).text(t=>t)),u.append("rect").attr("width",10).attr("height",10).style("fill",t=>a(t)),u.on("mouseover",function(t){const a=d3.select(this);d3.selectAll(`.legend-${e}`).transition().duration(300).ease(d3.easeLinear).style("opacity",.1),a.transition().duration(300).ease(d3.easeLinear).style("opacity",1),d3.selectAll(`.circle-${e}`).transition().duration(200).ease(d3.easeLinear).style("opacity",.1).filter(e=>e.decade===t).transition().duration(300).ease(d3.easeLinear).style("opacity",1),d3.select(this).call(y)}).on("mouseout",()=>{d3.selectAll(`.legend-${e}`).transition().duration(300).ease(d3.easeLinear).style("opacity",1),d3.selectAll(`.circle-${e}`).transition().duration(300).ease(d3.easeLinear).style("opacity",1),i.style("opacity",0)})}n.append("text").attr("class","legend-title").text("Décadas"),widthMobile>544?n.select(".legend-title").attr("transform","translate(50,110)"):n.select(".legend-title").attr("transform","translate(0,30)");window.addEventListener("resize",()=>{l(r)}),d3.csv(t,(t,e)=>{t?console.log(t):((r=e).forEach(t=>{t.size=widthMobile>544?+t.total/10:+t.total/17,t.radius=+t.size,t.year=t.year}),l(r))})}formatDate(),forceLayout(csvForce[0],records[0],colores[0]),forceLayout(csvForce[1],records[1],colores[1]);const vulturno=()=>{const t={top:0,right:16,bottom:24,left:32};let e=0,a=0;const c=d3.select(".chart-vulturno"),n=c.select("svg"),s={};let r;const o=c.append("div").attr("class","tooltip tooltip-temp").style("opacity",0),i=d3.bisector(t=>t.year).left,l=(t,e)=>{s.count.x.range([0,t]),s.count.y.range([e,0])},d=n=>{const l=d3.axisBottom(s.count.x).tickPadding(5).tickFormat(d3.format("d")).ticks(13);n.select(".axis-x").attr("transform",`translate(0,${a})`).transition().duration(500).ease(d3.easeLinear).call(l);const d=d3.axisLeft(s.count.y).tickPadding(5).tickFormat(t=>t+"ºC").tickSize(-e).ticks(6);n.select(".axis-y").transition().duration(500).ease(d3.easeLinear).call(d);const p=n.select(".focus"),m=n.select(".overlay");p.select(".x-hover-line").attr("y2",a),m.attr("width",e+t.left+t.right).attr("height",a).on("mouseover",()=>{p.style("display",null)}).on("mouseout",()=>{p.style("display","none"),o.style("opacity",0)}).on("mousemove",function(){const t=c.node().offsetWidth/2-176,e=s.count.x.invert(d3.mouse(this)[0]),a=i(r,e,1),n=r[a-1],l=r[a],d=e-n.fecha>l.fecha-e?l:n;o.style("opacity",1).html(`<p class="tooltip-media-texto">En <strong>${d.year}</strong> la temperatura media fue de <strong>${d.temp} ºC</strong>.<p/>`).style("left",`${t}px`),p.select(".x-hover-line").attr("transform",`translate(${s.count.x(d.fecha)},0)`)})};function p(o){const i=c.node().offsetWidth;e=i-t.left-t.right,a=544-t.top-t.bottom,n.attr("width",i).attr("height",544);const p=`translate(${t.left},${t.top})`,m=n.select(".chart-vulturno-container");m.attr("transform",p);const u=d3.line().x(t=>s.count.x(t.year)).y(t=>s.count.y(t.temp));l(e,a);const y=c.select(".chart-vulturno-container-bis"),x=y.selectAll(".lines").data([r]),f=x.enter().append("path").attr("class","lines"),g=y.selectAll(".circles").remove().exit().data(r),h=g.enter().append("circle").attr("class","circles");x.merge(f).transition().duration(600).ease(d3.easeLinear).attr("d",u),g.merge(h).attr("cx",t=>s.count.x(t.year)).attr("cy",0).transition().delay((t,e)=>10*e).duration(500).ease(d3.easeLinear).attr("cx",t=>s.count.x(t.year)).attr("cy",t=>s.count.y(t.temp)),d(m)}function m(t){d3.csv(`csv/${t}.csv`,(t,c)=>{(r=c).forEach(t=>{t.temp=+t.temp,t.year=t.year,t.fecha=+t.year,t.tempmax=+t.tempmax,t.yearmax=t.yearmax,t.tempmin=+t.tempmin,t.yearmin=t.yearmin}),s.count.x.range([0,e]),s.count.y.range([a,0]);const n=d3.scaleTime().domain([d3.min(r,t=>t.year),d3.max(r,t=>t.year)]),o=d3.scaleLinear().domain([d3.min(r,t=>t.temp-1),d3.max(r,t=>t.temp+1)]);s.count={x:n,y:o},p()})}window.addEventListener("resize",()=>{const t=d3.select("#select-city").property("value").replace(/[\u00f1-\u036f]/g,"").replace(/ /g,"_").replace(/á/g,"a").replace(/Á/g,"A").replace(/é/g,"e").replace(/è/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n");d3.csv(`csv/${t}.csv`,(t,e)=>{r=e,p()})}),d3.csv("csv/Albacete.csv",t=>{(r=t).forEach(t=>{t.year=t.year,t.temp=t.temp,t.fecha=+t.year}),(()=>{const t=n.select(".chart-vulturno-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-vulturno-container-bis"),t.append("rect").attr("class","overlay"),t.append("g").attr("class","focus").style("display","none").append("line").attr("class","x-hover-line hover-line").attr("y1",0),t.select(".focus").append("text").attr("class","text-focus")})(),(()=>{const t=d3.scaleTime().domain([d3.min(r,t=>t.year),d3.max(r,t=>t.year)]),e=d3.scaleLinear().domain([d3.min(r,t=>t.temp-1),d3.max(r,t=>t.temp+1)]);s.count={x:t,y:e}})(),p(),m("Albacete")}),d3.csv("csv/stations.csv",(t,e)=>{if(t)console.log(t);else{r=e;const t=d3.nest().key(t=>t.Name).entries(r),a=d3.select("#select-city");a.selectAll("option").data(t).enter().append("option").attr("value",t=>t.key).text(t=>t.key),a.on("change",function(){m(d3.select(this).property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,""))})}})},maxvul=()=>{const t=0,e=48,a=24,c=24;let n=0,s=0,r=0,o=0;const i=d3.select(".chart-temperature-max"),l=i.select("svg"),d={};let p;const m=()=>{d3.csv("csv/max-record.csv",(t,e)=>{if(t)console.log(t);else{(p=e).forEach(t=>{t.fecha=t.yearmax,t.total=t.totalmax});const t=[{data:{year:2012},y:100,dy:-50,dx:-52,note:{title:"Entre 2009 y 2018 se establecen el 78% de los récords de máximas",wrap:230,align:"middle"}}].map(t=>(this.subject={radius:4},t));window.makeAnnotations=d3.annotation().annotations(t).type(d3.annotationCalloutCircle).accessors({x:t=>d.count.x(t.year),y:t=>d.count.y(t.total)}).accessorsInverse({year:t=>d.count.x.invert(t.x),total:t=>d.count.y.invert(t.y)}).on("subjectover",t=>{t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!1)}).on("subjectout",t=>{t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)}),l.append("g").attr("class","annotation-test").call(makeAnnotations),l.selectAll("g.annotation-connector, g.annotation-note")}})},u=p=>{r=i.node().offsetWidth,n=r-c-e,s=(o=208)-t-a,l.attr("width",r).attr("height",o);const m=`translate(${c},${t})`,u=l.select(".chart-temperature-max-container");u.attr("transform",m),(t=>{d.count.x.range([0,t])})(n);const y=i.select(".chart-temperature-max-container-bis").selectAll(".circles-max").data(p),x=y.enter().append("circle").attr("class","circles-max");y.merge(x).attr("cx",t=>d.count.x(t.fecha)).attr("cy",s/2).attr("r",0).transition().delay((t,e)=>10*e).duration(500).attr("r",t=>3*t.total).attr("fill-opacity",.6),(t=>{const e=d3.axisBottom(d.count.x).tickFormat(d3.format("d")).ticks(6).tickPadding(30);t.select(".axis-x").attr("transform",`translate(0,${s/2})`).call(e)})(u)};window.addEventListener("resize",()=>{u(p)}),d3.csv("csv/max-record.csv",(t,e)=>{t?console.log(t):((p=e).forEach(t=>{t.fecha=t.yearmax,t.total=t.totalmax}),(()=>{const t=l.select(".chart-temperature-max-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","chart-temperature-max-container-bis")})(),(()=>{const t=d3.scaleLinear().domain([d3.min(p,t=>t.fecha),d3.max(p,t=>t.fecha)]),e=d3.scaleLinear().domain([d3.min(p,t=>t.total),d3.max(p,t=>t.total)]);d.count={x:t,y:e}})(),m(),u(p))})},minvul=()=>{const t=0,e=48,a=24,c=24;let n=0,s=0,r=0,o=0;const i=d3.select(".chart-temperature-min"),l=i.select("svg"),d={};let p;const m=()=>{d3.csv("csv/min-record.csv",(t,e)=>{if(t)console.log(t);else{(p=e).forEach(t=>{t.fecha=t.yearmin,t.total=t.totalmin});const t=[{data:{year:1988},y:100,dy:-50,note:{title:"Desde 1986 no se ha batido ni un solo récord de temperatura mínima",wrap:230,align:"middle"}}].map(t=>(this.subject={radius:4},t));window.makeAnnotations=d3.annotation().annotations(t).type(d3.annotationCalloutCircle).accessors({x:t=>d.count.x(t.year),y:t=>d.count.y(t.total)}).accessorsInverse({year:t=>d.count.x.invert(t.x),total:t=>d.count.y.invert(t.y)}).on("subjectover",t=>{t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!1)}).on("subjectout",t=>{t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)}),l.append("g").attr("class","annotation-test").call(makeAnnotations),l.selectAll("g.annotation-connector, g.annotation-note")}})},u=p=>{r=i.node().offsetWidth,n=r-c-e,s=(o=208)-t-a,l.attr("width",r).attr("height",o);const m=`translate(${c},${t})`,u=l.select(".chart-temperature-min-container");u.attr("transform",m),(t=>{d.count.x.range([0,t])})(n),(t=>{const e=d3.axisBottom(d.count.x).tickFormat(d3.format("d")).ticks(6).tickPadding(30);t.select(".axis-x").attr("transform",`translate(0,${s/2})`).call(e)})(u);const y=i.select(".chart-temperature-min-container-bis").selectAll(".circles-min").data(p),x=y.enter().append("circle").attr("class","circles-min");y.merge(x).attr("cx",t=>d.count.x(t.fecha)).attr("cy",s/2).attr("r",0).transition().delay((t,e)=>10*e).duration(500).attr("r",t=>3*t.total).attr("fill-opacity",.6)};window.addEventListener("resize",()=>{u(p)}),d3.csv("csv/min-record.csv",(t,e)=>{t?console.log(t):((p=e).forEach(t=>{t.fecha=t.yearmin,t.total=t.totalmin}),(()=>{const t=l.select(".chart-temperature-min-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","chart-temperature-min-container-bis")})(),(()=>{const t=d3.scaleLinear().domain([d3.min(p,t=>t.fecha),d3.max(p,t=>t.fecha)]);d.count={x:t}})(),m(),u(p))})},tropicalTotal=()=>{const t=0,e=16,a=24,c=32;let n=0,s=0;const r=d3.select(".chart-tropical"),o=r.select("svg"),i={};let l;const d=l=>{const d=r.node().offsetWidth;n=d-c-e,s=544-t-a,o.attr("width",d).attr("height",544);const p=`translate(${c},${t})`,m=o.select(".chart-tropical-container");m.attr("transform",p);const u=d3.area().x(t=>i.count.x(t.year)).y0(s).y1(t=>i.count.y(t.total)),y=d3.line().x(t=>i.count.x(t.year)).y(t=>i.count.y(t.total));((t,e)=>{i.count.x.range([0,t]),i.count.y.range([e,0])})(n,s);const x=r.select(".chart-tropical-container-bis"),f=x.selectAll(".area-tropical").data([l]),g=x.selectAll(".line-tropical").data([l]),h=f.enter().append("path").attr("class","area-tropical"),v=g.enter().append("path").attr("class","line-tropical");f.merge(h).transition().duration(600).ease(d3.easeLinear).attr("d",u),g.merge(v).transition(600).ease(d3.easeLinear).attr("d",y),(t=>{const e=d3.axisBottom(i.count.x).tickFormat(d3.format("d")).ticks(13);t.select(".axis-x").attr("transform",`translate(0,${s})`).call(e);const a=d3.axisLeft(i.count.y).tickFormat(d3.format("d")).ticks(5).tickSizeInner(-n);t.select(".axis-y").call(a)})(m)};window.addEventListener("resize",()=>{d(l)}),d3.csv("csv/total-tropicales.csv",(t,e)=>{t?console.log(t):((l=e).forEach(t=>{t.year=t.year,t.total=+t.total}),(()=>{const t=o.select(".chart-tropical-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-tropical-container-bis")})(),(()=>{const t=d3.scaleTime().domain([d3.min(l,t=>t.year),d3.max(l,t=>t.year)]),e=d3.scaleLinear().domain([0,d3.max(l,t=>1.25*t.total)]);i.count={x:t,y:e}})(),d(l))})},frostyTotal=()=>{const t=0,e=16,a=24,c=32;let n=0,s=0;const r=d3.select(".chart-frosty"),o=r.select("svg"),i={};let l;const d=l=>{const d=r.node().offsetWidth;n=d-c-e,s=544-t-a,o.attr("width",d).attr("height",544);const p=`translate(${c},${t})`,m=o.select(".chart-frosty-container");m.attr("transform",p);const u=d3.area().x(t=>i.count.x(t.year)).y0(s).y1(t=>i.count.y(t.total)),y=d3.line().x(t=>i.count.x(t.year)).y(t=>i.count.y(t.total));((t,e)=>{i.count.x.range([0,t]),i.count.y.range([e,0])})(n,s);const x=r.select(".chart-frosty-container-bis"),f=x.selectAll(".area-frosty").data([l]),g=x.selectAll(".line-frosty").data([l]),h=g.enter().append("path").attr("class","line-frosty"),v=f.enter().append("path").attr("class","area-frosty");f.merge(v).transition().duration(600).ease(d3.easeLinear).attr("d",u),g.merge(h).transition(600).ease(d3.easeLinear).attr("d",y),(t=>{const e=d3.axisBottom(i.count.x).tickFormat(d3.format("d")).ticks(13);t.select(".axis-x").attr("transform",`translate(0,${s})`).call(e);const a=d3.axisLeft(i.count.y).tickFormat(d3.format("d")).ticks(5).tickSizeInner(-n);t.select(".axis-y").call(a)})(m)};window.addEventListener("resize",()=>{d(l)}),d3.csv("csv/total-heladas.csv",(t,e)=>{t?console.log(t):((l=e).forEach(t=>{t.year=t.year,t.total=+t.total}),(()=>{const t=o.select(".chart-frosty-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-frosty-container-bis")})(),(()=>{const t=d3.scaleTime().domain([d3.min(l,t=>t.year),d3.max(l,t=>t.year)]),e=d3.scaleLinear().domain([0,d3.max(l,t=>1.25*t.total)]);i.count={x:t,y:e}})(),d(l))})},scatterInput=()=>{const t=16,e=16,a=24,c=32;let n=0,s=0;const r=d3.select(".scatter-inputs"),o=r.select("svg"),i={};let l;const d=d3.select("#select-scatter-city"),p=d3.select(".scatter-inputs").append("div").attr("class","tooltip tooltip-scatter").style("opacity",0),m=t=>t.split("-")[0],u=(t,e)=>{i.count.x.range([0,t]),i.count.y.range([e,0])},y=t=>{const e=d3.axisBottom(i.count.x).tickPadding(10).tickFormat(d3.format("d")).tickSize(-s).ticks(10);t.select(".axis-x").attr("transform",`translate(0,${s})`).transition().duration(500).ease(d3.easeLinear).call(e);const a=d3.axisLeft(i.count.y).tickFormat(t=>t+"ºC").tickSize(-n).ticks(6);t.select(".axis-y").transition().duration(500).ease(d3.easeLinear).call(a)},x=l=>{const m=r.node().offsetWidth;n=m-c-e,s=544-t-a,o.attr("width",m).attr("height",544);const x=`translate(${c},${t})`,f=o.select(".scatter-inputs-container");f.attr("transform",x),u(n,s);const g=r.select(".scatter-inputs-container-dos").selectAll(".scatter-inputs-circles").remove().exit().data(l),h=g.enter().append("circle").attr("class","scatter-inputs-circles"),v=d.property("value");g.merge(h).on("mouseover",t=>{const e=i.count.x(t.year)+270,a=`${d3.event.pageX}px`,c=`${d3.event.pageX-210}px`;p.transition(),p.attr("class","tooltip tooltip-scatter tooltip-min"),p.style("opacity",1).html(`<p class="tooltip-scatter-text">La temperatura mínima de ${v} en ${t.year} fue de ${t.minima}ºC<p/>`).style("left",e>m?c:a).style("top",`${d3.event.pageY-28}px`)}).on("mouseout",()=>{p.transition().duration(200).style("opacity",0)}).attr("cx",t=>i.count.x(t.year)).attr("cy",t=>i.count.y(t.minima)).transition().duration(500).ease(d3.easeLinear).attr("cx",t=>i.count.x(t.year)).attr("cy",t=>i.count.y(t.minima)).attr("r",6).style("fill","#257d98"),y(f)},f=()=>{let l=d3.select("#updateButtonDay").property("value"),x=d3.select("#updateButtonMonth").property("value");l<10&&(l=`0${l}`.slice(-2)),x<10&&(x=`0${x}`.slice(-2));let f=new RegExp(`^.*${`${x}-${l}`}$`,"gi");g();const h=d.property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,"");d3.csv(`csv/day-by-day/${h}-diarias.csv`,(l,x)=>{(x=x.filter(t=>String(t.fecha).match(f))).forEach(t=>{t.fecha=t.fecha,t.maxima=+t.maxima,t.minima=+t.minima,t.year=m(t.fecha)}),i.count.x.range([0,n]),i.count.y.range([s,0]);const g=d3.scaleTime().domain([d3.min(x,t=>t.year),d3.max(x,t=>t.year)]),h=d3.scaleLinear().domain([d3.min(x,t=>t.maxima),d3.max(x,t=>t.maxima)]),v=r.node().offsetWidth;n=v-c-e,s=544-t-a,o.attr("width",v).attr("height",544),i.count={x:g,y:h};const $=`translate(${c},${t})`,k=o.select(".scatter-inputs-container");k.attr("transform",$),u(n,s);const L=r.select(".scatter-inputs-container-dos").selectAll(".scatter-inputs-circles").remove().exit().data(x),w=L.enter().append("circle").attr("class","scatter-inputs-circles"),b=d.property("value");L.merge(w).on("mouseover",t=>{const e=r.node().offsetWidth,a=i.count.x(t.year)+270,c=`${d3.event.pageX}px`,n=`${d3.event.pageX-210}px`;p.transition(),p.attr("class","tooltip tooltip-scatter tooltip-max"),p.style("opacity",1).html(`<p class="tooltip-scatter-text">La temperatura máxima de ${b} en ${t.year} fue de ${t.maxima}ºC<p/>`).style("left",a>e?n:c).style("top",`${d3.event.pageY-28}px`)}).on("mouseout",()=>{p.transition().duration(200).style("opacity",0)}).attr("cx",t=>i.count.x(t.year)).attr("cy",t=>i.count.y(t.minima)).transition().duration(500).ease(d3.easeLinear).attr("cx",t=>i.count.x(t.year)).attr("cy",t=>i.count.y(t.maxima)).attr("r",0).transition().duration(100).ease(d3.easeLinear).attr("r",6).style("fill","#dc7176"),y(k)})},g=()=>{const t=document.getElementById("fail-month"),e=d3.select("#updateButtonDay").property("value"),a=d3.select("#updateButtonMonth").property("value");h(e,a,"2020")?t.classList.remove("fail-active"):t.classList.add("fail-active")},h=(t,e,a)=>{const c=new Date;return c.setFullYear(a,e-1,t),c.getFullYear()==a&&c.getMonth()==e-1&&c.getDate()==t};d3.select("#update").on("click",t=>{f()}),d3.select("#updateMin").on("click",t=>{(()=>{let t=d3.select("#updateButtonDay").property("value"),e=d3.select("#updateButtonMonth").property("value");t<10&&(t=`0${t}`.slice(-2)),e<10&&(e=`0${e}`.slice(-2));const a=new RegExp(`^.*${`${e}-${t}`}$`,"gi");g();const c=d.property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,"");d3.csv(`csv/day-by-day/${c}-diarias.csv`,(t,e)=>{(e=e.filter(t=>String(t.fecha).match(a))).forEach(t=>{t.fecha=t.fecha,t.maxima=+t.maxima,t.minima=+t.minima,t.year=m(t.fecha)}),i.count.x.range([0,n]),i.count.y.range([s,0]);const c=d3.scaleTime().domain([d3.min(e,t=>t.year),d3.max(e,t=>t.year)]),r=d3.scaleLinear().domain([d3.min(e,t=>t.minima),d3.max(e,t=>t.minima)]);i.count={x:c,y:r},x(e)})})()});window.addEventListener("resize",()=>{f()}),d3.csv("csv/day-by-day/Albacete-diarias.csv",(t,e)=>{t?console.log(t):(l=e,(l=e.filter(t=>String(t.fecha).match(/08-01$/))).forEach(t=>{t.fecha=t.fecha,t.maxima=+t.maxima,t.minima=+t.minima,t.year=m(t.fecha)}),(()=>{const t=o.select(".scatter-inputs-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","scatter-inputs-container-dos")})(),(()=>{const t=d3.scaleLinear().domain([d3.min(l,t=>t.year),d3.max(l,t=>t.year)]),e=d3.scaleLinear().domain([d3.min(l,t=>t.minima),d3.max(l,t=>t.minima)]);i.count={x:t,y:e}})(),x(l))}),d3.csv("csv/stations.csv",(t,e)=>{if(t)console.log(t);else{datos=e;const t=d3.nest().key(t=>t.Name).entries(datos);d.selectAll("option").data(t).enter().append("option").attr("value",t=>t.key).text(t=>t.key),d.on("change",()=>{f()})}})},tropicalCities=()=>{const t={top:0,right:16,bottom:24,left:24};let e=0,a=0;const c=d3.select(".chart-cities-tropical"),n=c.select("svg"),s={};let r;const o=(t,e)=>{s.count.x.range([0,t]),s.count.y.range([e,0])},i=t=>{const c=d3.axisBottom(s.count.x).tickPadding(5).tickFormat(d3.format("d")).ticks(13);t.select(".axis-x").attr("transform",`translate(0,${a})`).transition().duration(500).ease(d3.easeLinear).call(c);const n=d3.axisLeft(s.count.y).tickPadding(5).tickFormat(t=>t).tickSize(-e).ticks(6);t.select(".axis-y").transition().duration(500).ease(d3.easeLinear).call(n)};function l(l){const d=c.node().offsetWidth;e=d-t.left-t.right,a=544-t.top-t.bottom,n.attr("width",d).attr("height",544);const p=`translate(${t.left},${t.top})`,m=n.select(".chart-cities-tropical-container");m.attr("transform",p);const u=d3.area().x(t=>s.count.x(t.year)).y0(a).y1(t=>s.count.y(t.total)),y=d3.line().x(t=>s.count.x(t.year)).y(t=>s.count.y(t.total));o(e,a);const x=c.select(".chart-cities-tropical-container-bis"),f=x.selectAll(".area-cities-tropical").data([r]),g=x.selectAll(".line-cities-tropical").data([r]),h=f.enter().append("path").attr("class","area-cities-tropical"),v=g.enter().append("path").attr("class","line-cities-tropical");f.merge(h).transition().duration(600).ease(d3.easeLinear).attr("d",u),g.merge(v).transition(600).ease(d3.easeLinear).attr("d",y),i(m)}function d(t){d3.csv(`csv/tropicales/${t}-total-tropicales.csv`,(t,c)=>{(r=c).forEach(t=>{t.fecha=+t.year,t.tropical=+t.total}),s.count.x.range([0,e]),s.count.y.range([a,0]);const n=d3.scaleTime().domain([d3.min(r,t=>t.fecha),d3.max(r,t=>t.fecha)]),o=d3.scaleLinear().domain([0,d3.max(r,t=>1.25*t.tropical)]);s.count={x:n,y:o},l()})}window.addEventListener("resize",()=>{const t=d3.select("#select-city-tropical").property("value").replace(/[\u00f1-\u036f]/g,"").replace(/ /g,"_").replace(/á/g,"a").replace(/Á/g,"A").replace(/é/g,"e").replace(/è/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n");d3.csv(`csv/tropicales/${t}-total-tropicales.csv`,(t,e)=>{r=e,l()})}),d3.csv("csv/tropicales/Albacete-total-tropicales.csv",(t,e)=>{t?console.log(t):((r=e).forEach(t=>{t.fecha=+t.year,t.tropical=+t.total}),(()=>{const t=n.select(".chart-cities-tropical-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-cities-tropical-container-bis")})(),(()=>{const t=d3.scaleTime().domain([d3.min(r,t=>t.fecha),d3.max(r,t=>t.fecha)]),e=d3.scaleLinear().domain([0,d3.max(r,t=>1.25*t.tropical)]);s.count={x:t,y:e}})(),l(),d("Albacete"))}),d3.csv("csv/stations.csv",(t,e)=>{if(t)console.log(t);else{r=e;const t=d3.nest().key(t=>t.Name).entries(r),a=d3.select("#select-city-tropical");a.selectAll("option").data(t).enter().append("option").attr("value",t=>t.key).text(t=>t.key),a.on("change",function(){d(d3.select(this).property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,""))})}})},tempExt=()=>{const t={top:0,right:16,bottom:24,left:32};let e=0,a=0;const c=d3.select(".chart-temperature-ext"),n=c.select("svg"),s={};let r;const o=(t,e)=>{s.count.x.range([0,t]),s.count.y.range([e,0])},i=t=>{const c=d3.axisBottom(s.count.x).tickPadding(5).tickFormat(d3.format("d")).ticks(13);t.select(".axis-x").attr("transform",`translate(0,${a})`).transition().duration(500).ease(d3.easeLinear).call(c);const n=d3.axisLeft(s.count.y).tickPadding(5).tickFormat(t=>t).tickSize(-e).ticks(6);t.select(".axis-y").transition().duration(500).ease(d3.easeLinear).call(n)};function l(l){const d=c.node().offsetWidth;e=d-t.left-t.right,a=544-t.top-t.bottom,n.attr("width",d).attr("height",544);const p=`translate(${t.left},${t.top})`,m=n.select(".chart-temperature-ext-container");m.attr("transform",p);const u=d3.area().x(t=>s.count.x(t.year)).y0(a).y1(t=>s.count.y(t.total)),y=d3.line().x(t=>s.count.x(t.year)).y(t=>s.count.y(t.total));o(e,a);const x=c.select(".chart-temperature-ext-container-bis"),f=x.selectAll(".area-ext").data([r]),g=x.selectAll(".line-ext").data([r]),h=f.enter().append("path").attr("class","area-ext"),v=g.enter().append("path").attr("class","line-ext");f.merge(h).transition().duration(600).ease(d3.easeLinear).attr("d",u),g.merge(v).transition(600).ease(d3.easeLinear).attr("d",y),i(m)}function d(t){d3.csv(`csv/total-temp-${t}.csv`,(t,c)=>{(r=c).forEach(t=>{t.fecha=+t.year,t.tropical=+t.total}),s.count.x.range([0,e]),s.count.y.range([a,0]);const n=d3.scaleTime().domain([d3.min(r,t=>t.fecha),d3.max(r,t=>t.fecha)]),o=d3.scaleLinear().domain([0,d3.max(r,t=>1.25*t.tropical)]);s.count={x:n,y:o},l()})}window.addEventListener("resize",()=>{const t=d3.select("#select-ext").property("value").replace(/[\u00f1-\u036f]/g,"").replace(/ /g,"_").replace(/á/g,"a").replace(/Á/g,"A").replace(/é/g,"e").replace(/è/g,"e").replace(/í/g,"i").replace(/ó/g,"o").replace(/ú/g,"u").replace(/ñ/g,"n");d3.csv(`csv/total-temp-${t}.csv`,(t,e)=>{r=e,l()})}),d3.csv("csv/total-temp-35.csv",(t,e)=>{t?console.log(t):((r=e).forEach(t=>{t.fecha=+t.year,t.tropical=+t.total}),(()=>{const t=n.select(".chart-temperature-ext-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-temperature-ext-container-bis")})(),(()=>{const t=d3.scaleTime().domain([d3.min(r,t=>t.fecha),d3.max(r,t=>t.fecha)]),e=d3.scaleLinear().domain([0,d3.max(r,t=>1.25*t.tropical)]);s.count={x:t,y:e}})(),l(),d("35"))}),d3.csv("csv/temperature.csv",(t,e)=>{if(t)console.log(t);else{r=e;const t=d3.nest().key(t=>t.Name).entries(r),a=d3.select("#select-ext");a.selectAll("option").data(t).enter().append("option").attr("value",({key:t})=>t).text(({key:t})=>`${t}ºC`),a.on("change",function(){d(d3.select(this).property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,""))})}})};function directionalDot(t){const e=16,a=16,c=32,n=48;let s=0,r=0;const o=d3.select(`.chart-diff-records-${t}`),i=o.select("svg"),l={};let d;const p=d3.select(`.chart-diff-records-${t}`).append("div").attr("class","tooltip tooltip-diff").style("opacity",0),m=d3.select(`#select-month-${t}`),u=d3.select(`#select-cities-records-${t}`),y=`${t}`,x=d=>{const m=o.node().offsetWidth;s=m-n-a,r=600-e-c,i.attr("width",m).attr("height",600);const x=`translate(${n},${e})`,f=i.select(".chart-diff-records-container");f.attr("transform",x),((t,e)=>{l.count.x.range([15,t]),l.count.y.range([e,0])})(s,r);const g=o.select(".chart-diff-records-container-bis"),h=g.selectAll(`.circle-primero-${t}`).data(d);h.exit().remove();const v=g.selectAll(`.circle-segundo-${t}`).data(d);v.exit().remove();const $=g.selectAll(".circle-lines").data(d);$.exit().remove();const k=h.enter().append("circle").attr("class",`circle-primero-${t}`),L=v.enter().append("circle").attr("class",`circle-segundo-${t}`),w=$.enter().append("line").attr("class","circle-lines");$.merge(w).transition().duration(500).ease(d3.easeLinear).attr("x1",t=>l.count.x(t.dia)).attr("y1",t=>"max"===y?l.count.y(t.primero)+6:l.count.y(t.primero)-6).attr("x2",t=>l.count.x(t.dia)).attr("y2",t=>"max"===y?l.count.y(t.segundo)-6:l.count.y(t.segundo)+6).attr("stroke",t=>0===t.diff?"none":"#111");const b=u.property("value");h.merge(k).on("mouseover",e=>{const a=l.count.x(e.dia)+270,c=`${d3.event.pageX}px`,n=`${d3.event.pageX-210}px`;p.transition(),p.style("opacity",1).html(`<p class="tooltip-diff-text">La temperatura ${t} en ${b} se registro en ${e.yearprimera} y fue de ${e.primero}ºC<p/>`).style("left",a>m?n:c).style("top",`${d3.event.pageY-28}px`)}).on("mouseout",()=>{p.transition().duration(200).style("opacity",0)}).transition().duration(500).ease(d3.easeLinear).attr("cy",t=>l.count.y(t.primero)).attr("cx",t=>l.count.x(t.dia)).attr("r",6),v.merge(L).on("mouseover",e=>{const a=l.count.x(e.dia)+270,c=`${d3.event.pageX}px`,n=`${d3.event.pageX-210}px`;p.transition(),p.style("opacity",1).html(`<p class="tooltip-diff-text">La segunda temperatura ${t} en ${b} se registro en ${e.yearsegundo} y fue de ${e.segundo}ºC<p/>`).style("left",a>m?n:c).style("top",`${d3.event.pageY-28}px`)}).on("mouseout",()=>{p.transition().duration(200).style("opacity",0)}).transition().duration(500).ease(d3.easeLinear).attr("cy",t=>l.count.y(t.segundo)).attr("cx",t=>l.count.x(t.dia)).attr("r",t=>0===t.diff?0:6),(t=>{const e=d3.axisBottom(l.count.x).tickPadding(5).tickFormat(d3.format("d")).ticks(31);t.select(".axis-x").attr("transform",`translate(0,${r})`).transition().duration(500).ease(d3.easeLinear).call(e);const a=d3.axisLeft(l.count.y).tickPadding(5).tickFormat(t=>t+"ºC").ticks(15).tickSizeInner(-s);t.select(".axis-y").transition().duration(500).ease(d3.easeLinear).call(a)})(f)},f=()=>{const e=m.property("value"),a=u.property("value").replace(/ /g,"_").normalize("NFD").replace(/[\u0300-\u036f]/g,"");d3.csv(`csv/${t}/dos-records/${a}-dos-records.csv`,(t,a)=>{if((a=a.filter(t=>String(t.mes).match(e))).forEach(t=>{t.fecha=+t.fecha,t.primero=+t.primero,t.segundo=+t.segundo,t.diff=t.primero-t.segundo,t.dia=+t.dia}),"max"===y){const t=d3.scaleTime().domain([d3.min(a,t=>t.dia),d3.max(a,t=>t.dia)]),e=d3.scaleLinear().domain([d3.min(a,t=>t.segundo-1),d3.max(a,t=>t.primero+1)]);l.count={x:t,y:e}}else{const t=d3.scaleTime().domain([d3.min(a,t=>t.dia),d3.max(a,t=>t.dia)]),e=d3.scaleLinear().domain([d3.min(a,t=>t.primero-1),d3.max(a,t=>t.segundo+1)]);l.count={x:t,y:e}}x(a)})};window.addEventListener("resize",()=>{x(d)}),d3.csv(`csv/${t}/dos-records/Albacete-dos-records.csv`,(t,e)=>{t?console.log(t):((d=e.filter(t=>String(t.mes).match("Enero"))).forEach(t=>{t.fecha=+t.fecha,t.primero=+t.primero,t.segundo=+t.segundo,t.diff=t.primero-t.segundo,t.dia=+t.dia}),(()=>{const t=i.select(".chart-diff-records-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","chart-diff-records-container-bis")})(),(()=>{if("max"===y){const t=d3.scaleTime().domain([d3.min(d,t=>t.dia),d3.max(d,t=>t.dia)]),e=d3.scaleLinear().domain([d3.min(d,t=>t.segundo-1),d3.max(d,t=>t.primero+1)]);l.count={x:t,y:e}}else{const t=d3.scaleTime().domain([d3.min(d,t=>t.dia),d3.max(d,t=>t.dia)]),e=d3.scaleLinear().domain([d3.min(d,t=>t.primero-1),d3.max(d,t=>t.segundo+1)]);l.count={x:t,y:e}}})(),x(d),d3.csv("csv/mes.csv",(t,e)=>{if(t)console.log(t);else{const t=e,a=d3.nest().key(t=>t.Mes).entries(t);m.selectAll("option").data(a).enter().append("option").attr("value",t=>t.key).attr("number",(t,e)=>e+1).text(t=>t.key),m.on("change",()=>{f()})}}),d3.csv("csv/stations.csv",(t,e)=>{if(t)console.log(t);else{const t=e,a=d3.nest().key(t=>t.Name).entries(t);u.selectAll("option").data(a).enter().append("option").attr("value",t=>t.key).text(t=>t.key),u.on("change",()=>{f()})}}))})}tropicalCities(),scatterInput(),vulturno(),directionalDot(),directionalDot(maxmin[0]),directionalDot(maxmin[1]),new SlimSelect({select:"#select-city",searchPlaceholder:"Busca tu ciudad"}),new SlimSelect({select:"#select-scatter-city",searchPlaceholder:"Busca tu ciudad"}),new SlimSelect({select:"#select-city-tropical",searchPlaceholder:"Busca tu ciudad"}),new SlimSelect({select:"#select-ext",searchPlaceholder:"Selecciona temperatura"}),new SlimSelect({select:"#select-month-max",searchPlaceholder:"Selecciona un mes"}),new SlimSelect({select:"#select-month-min",searchPlaceholder:"Selecciona un mes"}),new SlimSelect({select:"#select-cities-records-max",searchPlaceholder:"Selecciona una ciudad"}),new SlimSelect({select:"#select-cities-records-min",searchPlaceholder:"Selecciona una ciudad"}),maxvul(),tropicalTotal(),frostyTotal(),minvul(),tempExt();const average=()=>{const t=24,e=24,a=24,c=40;let n=0,s=0;const r=d3.select(".line-average"),o=r.select("svg"),i={};let l;const d=l=>{const d=r.node().offsetWidth;n=d-c-e,s=600-t-a,o.attr("width",d).attr("height",600);const p=`translate(${c},${t})`,m=o.select(".line-average-container");m.attr("transform",p);const u=d3.line().x(t=>i.count.x(t.fecha)).y(t=>i.count.y(t.mediaXX)).curve(d3.curveStep);((t,e)=>{i.count.x.range([16,t]),i.count.y.range([e,0])})(n,s);const y=r.select(".line-average-container-dos"),x=y.selectAll(".line").data([l]),f=y.selectAll(".bar-vertical").data(l),g=f.enter().append("rect").attr("id",(t,e)=>"rect"+e).attr("class",t=>t.diff<0?"up":"down"),h=x.enter().append("path").attr("class","line").attr("stroke-width","1.5");f.merge(g).attr("width",n/l.length-4).attr("x",t=>i.count.x(t.fecha)-14).attr("y",t=>t.diff>0?i.count.y(t.mediaXX):i.count.y(t.mediaXX)-Math.abs(i.count.y(t.diff)-i.count.y(0))).attr("height",t=>Math.abs(i.count.y(t.diff)-i.count.y(0))),x.merge(h).attr("d",u),(t=>{const e=d3.axisBottom(i.count.x).tickFormat(d3.format("d")).ticks(33);t.select(".axis-x").attr("transform",`translate(0,${s})`).call(e);const a=d3.axisLeft(i.count.y).tickFormat(t=>t+"ºC").ticks(10).tickSizeInner(-n);t.select(".axis-y").call(a),t.append("text").attr("class","legend-aragon").attr("y","1%").attr("x","3%").text("Promedio de temperatura media entre 1980-2009"),t.append("rect").attr("class","legend-line").attr("y","0").attr("x","1%").attr("height","3px").attr("width","16px")})(m)};window.addEventListener("resize",()=>{d(l)}),d3.csv("csv/junio-1980-2019.csv",(t,e)=>{t?console.log(t):((l=e).forEach(t=>{t.mediaXX=+t.mediaXX,t.mediaXXI=+t.mediaXXI,t.diff=+t.diff}),(()=>{const t=o.select(".line-average-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","line-average-container-dos")})(),(()=>{const t=d3.scaleTime().domain([d3.min(l,t=>t.fecha),d3.max(l,t=>t.fecha)]),e=d3.scaleLinear().domain([d3.min(l,t=>t.mediaXX-4),d3.max(l,t=>t.mediaXX+4)]);i.count={x:t,y:e}})(),d(l))})};average();