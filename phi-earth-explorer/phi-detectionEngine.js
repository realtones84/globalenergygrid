function scanPhiPatterns(){

let results=[]

for(let i=0;i<phiNodes.length;i++){

for(let j=i+1;j<phiNodes.length;j++){

const d=distance(phiNodes[i],phiNodes[j])

const p=phiIndex(d)

if(Math.abs(p-Math.round(p))<0.08){

results.push({

a:phiNodes[i].name,
b:phiNodes[j].name,
phiLevel:Math.round(p)

})

}

}

}

return results

}
