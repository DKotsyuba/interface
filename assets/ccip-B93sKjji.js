import{ag as p,ah as m,ai as y,aj as w,a2 as k,ak as O,al as E,am as L,an as h,ao as x}from"./index-zqXExtuk.js";class M extends p{constructor({callbackSelector:s,cause:e,data:n,extraData:c,sender:u,urls:a}){var i;super(e.shortMessage||"An error occurred while fetching for an offchain result.",{cause:e,metaMessages:[...e.metaMessages||[],(i=e.metaMessages)!=null&&i.length?"":[],"Offchain Gateway Call:",a&&["  Gateway URL(s):",...a.map(f=>`    ${m(f)}`)],`  Sender: ${u}`,`  Data: ${n}`,`  Callback selector: ${s}`,`  Extra data: ${c}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class R extends p{constructor({result:s,url:e}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${m(e)}`,`Response: ${y(s)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class $ extends p{constructor({sender:s,to:e}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${e}`,`OffchainLookup sender address: ${s}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}const P="0x556f1830",S={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function v(o,{blockNumber:s,blockTag:e,data:n,to:c}){const{args:u}=w({data:n,abi:[S]}),[a,i,f,t,r]=u,{ccipRead:l}=o,b=l&&typeof(l==null?void 0:l.request)=="function"?l.request:j;try{if(!k(c,a))throw new $({sender:a,to:c});const d=await b({data:f,sender:a,urls:i}),{data:g}=await O(o,{blockNumber:s,blockTag:e,data:E([t,L([{type:"bytes"},{type:"bytes"}],[d,r])]),to:c});return g}catch(d){throw new M({callbackSelector:t,cause:d,data:n,extraData:r,sender:a,urls:i})}}async function j({data:o,sender:s,urls:e}){var c;let n=new Error("An unknown error occurred.");for(let u=0;u<e.length;u++){const a=e[u],i=a.includes("{data}")?"GET":"POST",f=i==="POST"?{data:o,sender:s}:void 0;try{const t=await fetch(a.replace("{sender}",s).replace("{data}",o),{body:JSON.stringify(f),method:i});let r;if((c=t.headers.get("Content-Type"))!=null&&c.startsWith("application/json")?r=(await t.json()).data:r=await t.text(),!t.ok){n=new h({body:f,details:r!=null&&r.error?y(r.error):t.statusText,headers:t.headers,status:t.status,url:a});continue}if(!x(r)){n=new R({result:r,url:a});continue}return r}catch(t){n=new h({body:f,details:t.message,url:a})}}throw n}export{j as ccipRequest,v as offchainLookup,S as offchainLookupAbiItem,P as offchainLookupSignature};
//# sourceMappingURL=ccip-B93sKjji.js.map