(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(13),u=t.n(a),c=t(14),l=t(2),i=t(3),f=t.n(i),m="http://localhost:3001/api/persons",s=function(){return f.a.get(m).then(function(e){return e.data})},d=function(e){return f.a.post(m,e).then(function(e){return e.data})},b=function(e){return f.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},g=function(e,n){return f.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},p=function(e){var n=e.message,t={color:e.errorCode,background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return console.log("ErrorMessage: ",n),null===n?null:o.a.createElement("div",{style:t},n)};function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}var v=function(e){return o.a.createElement("div",null,"Filtter users: ",o.a.createElement("input",{value:e.value,onChange:e.onChange}))},E=function(e){return o.a.createElement("form",{onSubmit:e.onSubmit},o.a.createElement("div",null,"Name: ",o.a.createElement("input",{value:e.nameChange,onChange:e.nameEvent})),o.a.createElement("div",null,"Number: ",o.a.createElement("input",{value:e.numberChange,onChange:e.numberEvent})),o.a.createElement("button",{type:"submit"},"add"))},O=function(e){return o.a.createElement("ul",null,e.rows)},w=function(){var e=Object(r.useState)([]),n=Object(l.a)(e,2),t=n[0],a=n[1],u=Object(r.useState)(""),i=Object(l.a)(u,2),f=i[0],m=i[1],w=Object(r.useState)(""),j=Object(l.a)(w,2),y=j[0],C=j[1],S=Object(r.useState)(""),T=Object(l.a)(S,2),P=T[0],k=T[1],x=Object(r.useState)(null),D=Object(l.a)(x,2),N=D[0],G=D[1],I=Object(r.useState)("Green"),R=Object(l.a)(I,2),U=R[0],J=R[1];Object(r.useEffect)(function(){s().then(function(e){a(e)})},[]);var L=t.filter(function(e){return-1!==e.name.toLowerCase().indexOf(P.toLowerCase())}),A=function(e,n,r){var o=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(t,!0).forEach(function(n){Object(c.a)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}({},t.find(function(n){return n.id===e}),{number:n});window.confirm("".concat(r," is already added to phonebook, replace the old number with a new one?"))&&(console.log("Updated ".concat(e," with ").concat(n)),g(e,o).then(function(n){G("Updated ".concat(o.name)),J("Green"),setTimeout(function(){G(null),J(null)},5e3),a(t.map(function(t){return t.id!==e?t:n}))}).catch(function(e){G("There was an error updating ".concat(o)),J("Red"),setTimeout(function(){G(null)},5e3)}))},B=function(e){var n=0,r=0;t.forEach(function(e){e.name===f&&(r=e.id,n=1,console.log("error",n))}),0===n?d(e).then(function(n){G("Added ".concat(e.name)),J("Green"),setTimeout(function(){G(null)},5e3),a(t.concat(n))}).catch(function(e){G(JSON.stringify(e.response.data)),J("Red"),setTimeout(function(){G(null)},5e3)}):A(r,e.number,e.name)};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(p,{message:N,errorCode:U}),o.a.createElement(v,{value:P,onChange:function(e){console.log("FiltterChange",e.target.value),k(e.target.value)}}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(E,{onSubmit:function(e){e.preventDefault();var n={name:f,number:y},r=B(n);console.log("buffer: ",r),m(""),C(""),console.log("painettu",e.target),console.log("Nimiobjekti",n),console.log("Lista:",t)},nameChange:f,nameEvent:function(e){console.log(e.target.value),m(e.target.value)},numberChange:y,numberEvent:function(e){console.log("NumberChange",e.target.value),C(e.target.value)}}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(O,{rows:L.map(function(e){return o.a.createElement("li",{key:e.id},e.name," ",e.number,o.a.createElement("button",{onClick:function(){return n=e.id,r=e.name,void(window.confirm("Delete ".concat(r))&&b(n).then(function(){G("POISTETTUPOISTETTU"),J("Green"),setTimeout(function(){G(null),J(null)},5e3),a(t.filter(function(e){return e.id!==n}))}).catch(function(e){G("Information of ".concat(r," has already been removed from server")),J("Red"),setTimeout(function(){G(null)},5e3),a(t.filter(function(e){return e.id!==n}))}));var n,r}},"delete"))})}))};u.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.55e25727.chunk.js.map