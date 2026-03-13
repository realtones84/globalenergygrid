async function loadWiki(name){

try{

const r=await fetch(
"https://en.wikipedia.org/api/rest_v1/page/summary/"
+encodeURIComponent(name)
)

const d=await r.json()

return{

title:d.title,
desc:d.extract,
image:d.thumbnail ? d.thumbnail.source : null

}

}catch(e){

return null

}

}
