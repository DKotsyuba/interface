import{aa as a,af as s}from"./index-zqXExtuk.js";var m={[a.eth]:"ethereum",[a.bnb]:"binance",[a.matic]:"polygon",[a.op]:"optimism",[a.arbitrum]:"arbitrum",[a.gnosis]:"",[a.avalanche]:"avalanchec",[a.fantom]:"fantom",[a.aurora]:"aurora",[a.klaytn]:"",[a.zkSyncEra]:"zksync"},c=({address:t,chainId:o})=>new Promise((n,e)=>{if(!t||!o)return e();const r=new Image;r.onload=()=>n(r),r.onerror=e,r.src=`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${m[o]}/assets/${s(t.toLowerCase())}/logo.png`});export{c as trustWalletRepository};
//# sourceMappingURL=trustwallet.repository-CND747AI-DgGWDxpY.js.map