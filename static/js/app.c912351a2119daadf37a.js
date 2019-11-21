webpackJsonp([2],{Cj1S:function(t,e){},F3qc:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("xd7I"),i={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"main_header"},[e("h2",[this._v("todo")])])}]};var r=o("C7Lr")({},i,!1,function(t){o("uSvJ")},"data-v-40b78c3c",null).exports,s=(o("F3qc"),{name:"App",components:{TodoHeader:r,TodoFooter:{data:function(){return{author:"j190512@163.com"}},render:function(){var t=arguments[0];return t("footer",[t("span",{style:{userSelect:"text"}},["emile : ",this.author])])}}},mounted:function(){}}),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",[e("todo-header"),this._v(" "),e("router-view",{key:this.$route.params.id}),this._v(" "),e("todo-footer")],1)])},staticRenderFns:[]};var c=o("C7Lr")(s,a,!1,function(t){o("P3h1")},null,null).exports,l=o("7LQH"),d=o("HzJ8"),u=o.n(d),f={props:{todo:{type:Object,required:!0}},data:function(){return{timer:null,tip:!1,completed:this.todo.completed}},methods:{deleteTodo:function(t){if(1==this.todo.completed)return this.$store.commit("deleteTodo",t),void this.$store.commit("coverLocalTodos",this.$route.params.id);this.$notify({content:"先完成,再删除"})},selectItem:function(t){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){e.$store.commit("changeTodoCompleted",{id:t,completed:e.completed}),e.$emit("selectItem")},1)}},watch:{"todo.completed":function(){this.completed=this.todo.completed},deep:!0}},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo_item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.completed,expression:"completed"}],attrs:{type:"checkbox",id:"checkbox"+t.todo.id},domProps:{checked:Array.isArray(t.completed)?t._i(t.completed,null)>-1:t.completed},on:{click:function(e){return t.selectItem(t.todo.id)},change:function(e){var o=t.completed,n=e.target,i=!!n.checked;if(Array.isArray(o)){var r=t._i(o,null);n.checked?r<0&&(t.completed=o.concat([null])):r>-1&&(t.completed=o.slice(0,r).concat(o.slice(r+1)))}else t.completed=i}}}),t._v(" "),o("label",{attrs:{for:"checkbox"+t.todo.id}}),t._v(" "),o("span",{class:["txt",t.todo.completed?"completed":""]},[t._v(t._s(t.todo.content))]),t._v(" "),o("button",{staticClass:"destory",on:{click:function(e){return t.deleteTodo(t.todo.id)}}},[t._v("X")])])},staticRenderFns:[]};var h=o("C7Lr")(f,m,!1,function(t){o("dIP3")},"data-v-ce6be116",null).exports,p={props:{filter:{type:String,required:!0},tabs_chBox_state:{type:Boolean,required:!0}},data:function(){return{flag:!1,states:["全部","待完成","已完成"]}},methods:{del:function(){this.$store.commit("delAllTodo"),this.$store.commit("coverLocalTodos",this.$route.params.id),this.$emit("del")},selectAll:function(){this.$emit("all",this.$refs.selectAll.checked)},selectKind:function(t){this.$emit("stateChange",t)}},watch:{tabs_chBox_state:function(){this.$refs.selectAll.checked=this.tabs_chBox_state}}},v={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"tab"},[o("input",{ref:"selectAll",attrs:{type:"checkbox",id:"checkbox"},on:{click:t.selectAll}}),t._v(" "),o("label",{attrs:{for:"checkbox"}}),t._v(" "),o("span",{staticClass:"desc"},[t._v("全选")]),t._v(" "),o("div",{staticClass:"items"},t._l(t.states,function(e){return o("button",{key:e,class:t.filter===e?"actived":"",on:{click:function(o){return t.selectKind(e)}}},[t._v("\n    "+t._s(e)+"\n  ")])}),0),t._v(" "),o("button",{staticClass:"del",on:{click:t.del}},[t._v("删除")])])},staticRenderFns:[]};var _={components:{TodoItem:h,tabs:o("C7Lr")(p,v,!1,function(t){o("yQC/")},"data-v-abd35684",null).exports},data:function(){return{time:Math.floor(new Date/1e3),filter:"全部",tabs_chBox_state:!1}},mounted:function(){this.$store.commit("localUser",JSON.parse(localStorage.getItem(this.$route.params.id+"Todos")))},methods:{addTodo:function(t){""!==t.target.value&&(Math.floor(new Date/1e3)-this.time<1||(this.time=Math.floor(new Date/1e3),this.$store.commit("addTodo",{content:t.target.value.trim(),completed:!1}),t.target.value="",this.tabsChBoxState(),this.$store.commit("coverLocalTodos",this.$route.params.id)))},filterChange:function(t){this.filter=t,this.tabsChBoxState()},allCompleted:function(t){var e=!0,o=!1,n=void 0;try{for(var i,r=u()(this.filterTodos);!(e=(i=r.next()).done);e=!0){var s=i.value;this.$store.commit("changeTodoCompleted",{id:s.id,completed:t})}}catch(t){o=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(o)throw n}}this.$store.commit("coverLocalTodos",this.$route.params.id),this.tabsChBoxState()},tabsChBoxState:function(){var t=this;setTimeout(function(){if(""!=t.filterTodos){var e=!0,o=!1,n=void 0;try{for(var i,r=u()(t.filterTodos);!(e=(i=r.next()).done);e=!0){if(0==i.value.completed)return void(t.tabs_chBox_state=!1)}}catch(t){o=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(o)throw n}}t.tabs_chBox_state=!0}else t.tabs_chBox_state=!1},1)}},computed:{todos:function(){return this.$store.state.todos},filterTodos:function(){if("全部"===this.filter)return this.todos;var t="已完成"===this.filter;return this.todos.filter(function(e){return t===e.completed})}}},b={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"content"},[o("input",{staticClass:"add_input",attrs:{type:"text",autofocus:"",placeholder:"下一项目"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)}}}),t._v(" "),t._l(t.filterTodos,function(e){return o("todo-item",{key:e.id,attrs:{todo:e},on:{selectItem:t.tabsChBoxState}})}),t._v(" "),o("tabs",{staticClass:"tabs",attrs:{filter:t.filter,tabs_chBox_state:t.tabs_chBox_state},on:{del:t.tabsChBoxState,stateChange:t.filterChange,all:t.allCompleted}})],2)},staticRenderFns:[]};var x=o("C7Lr")(_,b,!1,function(t){o("jxSi")},"data-v-18a277fd",null).exports;n.a.use(l.a);var y=new l.a({routes:[{path:"/",redirect:"/login"},{path:"/app/:id",component:x,meta:{requireLogin:!0}},{path:"/login",component:function(){return o.e(0).then(o.bind(null,"W2Q3"))}}]}),C=(o("Cj1S"),o("48sp")),T={name:"notice",props:{contentProp:{type:String,default:"通知"}},data:function(){return{content:this.contentProp,visible:!1,time:2e3,timer:null}},mounted:function(){this.autoDel()},methods:{clearTimer:function(){clearTimeout(this.timer)},autoDel:function(){var t=this;this.timer=setTimeout(function(){t.visible=!1},this.time)},del:function(){this.visible=!1}}},$={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"fade"}},[t.visible?o("div",{staticClass:"wrap",on:{mouseenter:t.clearTimer,mouseleave:t.autoDel}},[o("span",[t._v(t._s(t.content))]),t._v(" "),o("div",{staticClass:"btn",on:{click:t.del}},[t._v("X")])]):t._e()])},staticRenderFns:[]};var g=o("C7Lr")(T,$,!1,function(t){o("vfOP")},"data-v-6f8497c2",null).exports,k=n.a.extend(g),S=[];var w=function(t){if(!n.a.prototype.$isServer)if(e)console.log("instance exist");else{var e=new k({data:t}).$mount();document.body.appendChild(e.$el),S.push(e),n.a.nextTick(function(){e.visible=!0}),S.length>1&&(S[0].visible=!1,document.body.removeChild(S[0].$el),S.splice(0,1))}},B={todos:[{id:1,content:"使用localStore存储数据",completed:!0},{id:2,content:"使用了vue-router vuex",completed:!0}]},A=o("3cXf"),L=o.n(A),I={changeTodoCompleted:function(t,e){var o=!0,n=!1,i=void 0;try{for(var r,s=u()(t.todos);!(o=(r=s.next()).done);o=!0){var a=r.value;a.id===e.id&&(a.completed=e.completed)}}catch(t){n=!0,i=t}finally{try{!o&&s.return&&s.return()}finally{if(n)throw i}}},deleteTodo:function(t,e){t.todos.splice(t.todos.findIndex(function(t){return t.id===e}),1)},delAllTodo:function(t){t.todos=t.todos.filter(function(t){return 0==t.completed})},addTodo:function(t,e){t.todos.unshift({id:Math.floor(new Date/1e3),content:e.content,completed:e.completed})},localUser:function(t,e){t.todos=e},coverLocalTodos:function(t,e){localStorage.setItem(e+"Todos",L()(t.todos))}},P={},E={},F=o("Muz9"),j=o.n(F);n.a.prototype.$axios=j.a,n.a.use(function(t){t.component(g.name,g),t.prototype.$notify=w}),n.a.use(C.a);var q=new function(){var t=new C.a.Store({strict:!1,state:B,mutations:I,actions:P,getters:E});return t};n.a.config.productionTip=!1,y.beforeEach(function(t,e,o){"/login"!=t.path?t.meta.requireLogin&&localStorage.getItem(t.params.id)?o():o({path:"/login"}):o()}),new n.a({el:"#app",router:y,store:q,components:{App:c},template:"<App/>"})},P3h1:function(t,e){},dIP3:function(t,e){},jxSi:function(t,e){},uSvJ:function(t,e){},vfOP:function(t,e){},"yQC/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c912351a2119daadf37a.js.map