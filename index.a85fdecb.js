fetch(`https://restcountries.com/v3.1/name/${"usa"}?fields=name.official,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}));
//# sourceMappingURL=index.a85fdecb.js.map
