const fmode = 2; // Select mode for fetch data format: 1 - see rates (variable) sample; 2 - see rates2 (variable) sample. Samples are provided in the below code. The setting is to be used in live fetch too.
const dm = "document.querySelectorAll";
let em = "";
let lt = new Date();
let ohd = false;
let s = [
	".widget .w-b .w-b-c .wbc-h",
	".widget .w-b .w-b-c .wbc-h .wbc-h-l",
	".widget .w-b .w-b-c .wbc-b",
	".widget .w-b .w-b-c .wbc-b .wbc-b-rb td:nth-child(1) div",
	".widget .w-b .w-b-c:nth-child(?) .wbc-b .wbc-b-rb td:nth-child(1) div"
];
let p = [
	"backgroundColor",
	"color"
]
let colors = [
	[
		{sel:s[0],c:"rgba(227,249,233,1)",prop:p[0],l:null},
		{sel:s[1],c:"rgba(95,193,99,1)",prop:p[1],l:"асъори нақдӣ"},
		{sel:s[2],c:"rgba(227,249,233,1)",prop:p[0],l:null},
		{sel:s[3],c:"rgba(85,210,113,0.65)",prop:p[0],l:null}
	],
	[
		{sel:s[0],c:"rgba(231,245,250,1)",prop:p[0],l:null},
		{sel:s[1],c:"rgba(95,111,193,1)",prop:p[1],l:"интиқолҳо"},
		{sel:s[2],c:"rgba(231,245,250,1)",prop:p[0],l:null},
		{sel:s[3],c:"rgba(129,170,233,0.65)",prop:p[0],l:null}
	],
	[
		{sel:s[0],c:"rgba(185,246,247,0.35",prop:p[0],l:null},
		{sel:s[1],c:"rgba(49,151,153,1)",prop:p[1],l:"асъори ғайринақдӣ"},
		{sel:s[2],c:"rgba(185,246,247,0.35)",prop:p[0],l:null},
		{sel:s[3],c:"rgba(49,151,153,0.62)",prop:p[0],l:null}
	]
];
let rates = [
		{
			"NBT": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},
			"EXCHBuy": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},
			"EXCHSell": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},
			"MTBuy": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},
			"MTSell": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},/*
			"NonCashExchBuy": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},
			"NonCashExchSell": {
				"USD":"0.0000",
				"RUB":"0.0000",
				"EUR":"0.0000",
				"CNY":"0.0000"
			},*/
			"BDate": "2022-10-18"
		}
	];
let rates2 = {
	  "data": [
		[
		  "Cash_Rate",
		  [
			[
			  "USD",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "RUB",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "EUR",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "CNY",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			]
		  ]
		],
		[
		  "MoneyTransfer_Rate",
		  [
			[
			  "USD",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "RUB",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "EUR",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "CNY",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			]
		  ]
		],
		[
		  "NonCash_Rate",
		  [
			[
			  "USD",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "RUB",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "EUR",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			],
			[
			  "CNY",
			  "0.0000",
			  "0.0000",
			  "0.0000"
			]
		  ]
		]
	  ],
	  "bdate": "2022-10-18"
	};
let uit = null;
function fetchData(){
	if(fmode == 1 || fmode == 2){
		function goFetch(p,rt){			
			if(p == 1){
				rates = JSON.parse(rt);
				//populateRates();
				setNewRates(p,rt);
			}
			else{
				rates2 = JSON.parse(rt);
				//populateRates2();
				setNewRates(p,rt);
			}
		}
		function td(date1,date2){
			return parseFloat((Math.abs(date1 - date2) / 36e5).toFixed(2));
		}
		try{
			const xh = new XMLHttpRequest();
			xh.onreadystatechange = () => {
				if(xh.readyState == 4){
					if(xh.status === 200){
						ohd = true;
						lt = new Date();
						goFetch(fmode,xh.responseText);
					}
				}
				else{
					em = "could not get response (rates) from remote server";
				}
			}
			xh.open("GET","https://my.tawhid.tj/twbrates/v2/Handler" + ((fmode == 1) ? "" : "2") + ".ashx",true);
			xh.send();
		}
		catch(e){
			//em = e.message;
			if(td(lt,new Date()) > 8){
				document.querySelectorAll(".w-b")[0].innerHTML = "<div class='e'>could not get response (rates) properly</div>";
				setTimeout(function(){document.querySelectorAll(".w-b")[0].style.opacity = 1},10);
			}
			else{
				if(ohd && td(lt,new Date()) < 24){
					goFetch(fmode,((fmode == 1) ? JSON.stringify(rates) : JSON.stringify(rates2)));
				}
				else{
					document.querySelectorAll(".w-b")[0].innerHTML = "<div class='e'>could not get response (rates) properly</div>";
					setTimeout(function(){document.querySelectorAll(".w-b")[0].style.opacity = 1},10);
				}
			}
		}
	}
	else{
		em = "exchange rates were not found";		
	}
}

function populateRates(){
	//converting old json to new Array
	let newratesinit = [];
	let newrates = [];
	let nbtrate = {};
	for(x in rates[0]){
		if(rates[0].hasOwnProperty(x)){
			if(x !== "NBT" && x !== "BDate"){
				let crncies = [];
				let values = [];
				for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y);values.push(rates[0][x][y])}};
				eval("newratesinit.push({" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "})");
			}
			if(x == "NBT"){
				let crncies = [];
				let values = [];
				for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y);values.push(rates[0][x][y])}};
				eval("nbtrate = {" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "}");
			}
		}
	}
	let rc = document.querySelectorAll(".widget .w-b")[0]
	rc.innerHTML = "";
	let nrsize = (newratesinit.length/2);
	function genRtRows(buy,sell,nbt,rnum){
		let retval = "";
		for(j=0;j<rnum;j++){
			retval += `
								<tr class="wbcbrb-ln">
									<td class="wbcbrc-r"><div class="wbcbrc-r-l">` + buy.c[j] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + buy.v[j] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + sell.v[j] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + nbt.v[j] + `</div></td>
								</tr>
			`;
		}
		return retval;
	}
	if(newratesinit.length >= 2 && newratesinit.length % 2 == 0){
		for(i=0;i<nrsize;i++){
			let j = (i*2)+1;
			newrates.push([newratesinit[j],newratesinit[j-1],nbtrate]);
		}
		for(i=0;i<newrates.length;i++){
			let raterows = genRtRows(newrates[i][0],newrates[i][1],newrates[i][2],newrates[i][0].c.length);
			rc.innerHTML += `
					<div class="w-b-c">
					<div class="wbc-h" onclick="pickTheRate(this)"><div class="wbc-h-l"><div class="wbc-h-l-b"><div class="wbchlb-t">rate label</div><div class="wbchlb-a"></div></div></div></div>
						<div class="wbc-s">
							<table>
								<tr>
									<td><div class="wbc-s-l">АСЪОР</div></td>
									<td><div class="wbc-s-l">ХАРИД</div></td>
									<td><div class="wbc-s-l">ФУРӮШ</div></td>
									<td><div class="wbc-s-l">БМТ</div></td>
								</tr>
							</table>
						</div>
						<div class="wbc-b">
							<table class="wbc-b-rb" cellpadding="5" cellspacing="0">
								` + raterows + `
							</table>
						</div>
					</div>
			`;
		}
	}
	colorize();
}

function populateRates2(){
	let rc = document.querySelectorAll(".widget .w-b")[0]
	rc.innerHTML = "";
	let nrsize = rates2.data.length;
	function genRtRows2(indiv_rates){
		let retval = "";
		for(j=0;j<indiv_rates.length;j++){
			retval += `
								<tr class="wbcbrb-ln">
									<td class="wbcbrc-r"><div class="wbcbrc-r-l">` + indiv_rates[j][0] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + indiv_rates[j][1] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + indiv_rates[j][2] + `</div></td>
									<td class="wbcbrb-ln-f"><div class="wbcbrb-ln-f-v">` + indiv_rates[j][3] + `</div></td>
								</tr>
			`;
		}
		return retval;
	}
	let newrates = rates2.data;
	for(i=0;i<newrates.length;i++){
		let raterows = genRtRows2(newrates[i][1]);
		rc.innerHTML += `
				<div class="w-b-c">
					<div class="wbc-h" onclick="pickTheRate(this)"><div class="wbc-h-l"><div class="wbc-h-l-b"><div class="wbchlb-t">rate label</div><div class="wbchlb-a"></div></div></div></div>
					<div class="wbc-s">
						<table>
							<tr>
								<td><div class="wbc-s-l">АСЪОР</div></td>
								<td><div class="wbc-s-l">ХАРИД</div></td>
								<td><div class="wbc-s-l">ФУРӮШ</div></td>
								<td><div class="wbc-s-l">БМТ</div></td>
							</tr>
						</table>
					</div>
					<div class="wbc-b">
						<table class="wbc-b-rb" cellpadding="5" cellspacing="0">
							` + raterows + `
						</table>
					</div>
				</div>
		`;
	}
	
	colorize();
}

function colorize(){
	for(i=0;i<colors.length;i++){
		if(eval(dm + "('" + colors[i][0].sel + "')[" + i.toString() + "]") !== undefined){
			eval(dm + "('" + colors[i][0].sel + "')[" + i.toString() + "].style." + colors[i][0].prop + "='" + colors[i][0].c + "'");
			eval(dm + "('" + colors[i][1].sel + "')[" + i.toString() + "].style." + colors[i][1].prop + "='" + colors[i][1].c + "'");
			if(colors[i][1].l !== null){eval(dm + "('" + colors[i][1].sel + "')[" + i.toString() + "].children[0].children[0].innerHTML=\"" + colors[i][1].l + "\"");}
			eval(dm + "('" + colors[i][2].sel + "')[" + i.toString() + "].style." + colors[i][2].prop + "='" + colors[i][2].c + "'");
			for(j=0;j<eval(dm + "('" + s[4].replace("?",(i+1).toString()) + "')").length;j++){
				eval(dm + "('" + s[4].replace("?",(i+1).toString()) + "')[" + j + "].style." + colors[i][3].prop + "='" + colors[i][3].c + "'");
			}
		}
	}
	const t = setTimeout(function(){
		document.querySelectorAll(".widget .w-b")[0].style.opacity = 1;
		pickTheRate(document.querySelectorAll(".widget .w-b .w-b-c .wbc-h")[0]);
	},10);
}

function pickTheRate(el){
	if(el.parentElement !== undefined){
		let tc = el.parentElement;
		let ac = el.parentElement.parentElement.children;
		for(i=0;i<ac.length;i++){
			if(ac[i] == tc){
				let rh = ((tc.children[2].children[0].children[0].children.length) * 31) + 42 + 40;
				tc.style.height = rh + "px";
				setTimeout(function(){
					tc.children[1].style.opacity = "1";
					tc.children[2].style.opacity = "1";
					el.children[0].children[0].children[1].style.transform = "rotate(-90deg)";
				},120)
			}
			else{
				ac[i].children[1].style.opacity = "0";
				ac[i].children[2].style.opacity = "0";
				ac[i].style.height = "40px";
				ac[i].children[0].children[0].children[0].children[1].style.transform = "rotate(0deg)";
			}
		}
	}
}

function setNewRates(fm,ro){
	let wb = document.querySelectorAll('.w-b')[0];
	let wb_l = wb.children.length;
	let wb_al = [];
	let rf_al = [];
	let rf_dt = [];
	let rt_ah = [];
	let cp = false;
	let uip = false;
	for(h=0;h<wb_l;h++){
		let wb_t = wb.children[h].children[2].children[0].children[0];
		for(i=0;i<wb_t.children.length;i++){
			let rl_cr = wb_t.children[i].children[0].children[0].innerText;
			let rl_c = wb_t.children[i].children.length - 1;
			wb_al.push({c:h,cr:rl_cr,l:rl_c})
		}
	}
	if(fm == 1){
		let newratesinit = [];
		let newrates = [];
		let nbtrate = {};
		for(x in rates[0]){
			if(rates[0].hasOwnProperty(x)){
				if(x !== "NBT" && x !== "BDate"){
					let crncies = [];
					let values = [];
					for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y);values.push(rates[0][x][y])}};
					eval("newratesinit.push({" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "})");
				}
				if(x == "NBT"){
					let crncies = [];
					let values = [];
					for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y);values.push(rates[0][x][y])}};
					eval("nbtrate = {" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "}");
				}
			}
		}
		let nrsize = (newratesinit.length/2);
		if(newratesinit.length >= 2 && newratesinit.length % 2 == 0){
			for(i=0;i<nrsize;i++){
				let j = (i*2)+1;
				newrates.push([newratesinit[j],newratesinit[j-1],nbtrate]);
			}
			let ta = [];
			for(h=0;h<newrates.length;h++){
				let wb_t = newrates[h];
				let ar = [];
				ar.push(wb_t[0].c);
				for(h1=0;h1<wb_t.length - 1;h1++){
					ar.push(wb_t[h1].v);
				}
				ar.push(newrates[0][2].v);
				ta.push(ar);
				switch(Object.keys(newrates[h][0])[0]){
					case "EXCHSell": 
						rt_ah.push("асъори нақдӣ");
						break;
					case "MTSell":  
						rt_ah.push("интиқолҳо");
						break;
					default:
						rt_ah.push(Object.keys(newrates[h][0])[0]);
						break;
				}
			}
			// converting horizontal array [ta] to vertical array [na]
			//---------------- START
			let na = []
			for(h=0;h<ta.length;h++){
				let ar = []
				for(j=0;j<ta[h][0].length;j++){
					ar.push([ta[h][0][j]]);
				}
				for(k=0;k<ar.length;k++){
					for(l=1;l<ta[h].length;l++){
						ar[k].push(ta[h][l][k]);
					}
				}
				na.push(ar);
			}
			//---------------- END
			let a0 = [];
			for(m0=0;m0<na.length;m0++){
				let a1 = [];
				for(m=0;m<na[m0].length;m++){
					let ar = []
					rf_al.push({c:m0,cr:na[m0][m][0],l:na[m0][m].length - 1});
					for(o=0;o<na[m0][m].length;o++){
						ar.push(na[m0][m][o]);
					}
					a1.push(ar);
				}
				a0.push(a1);
			}
			rf_dt.push(a0);
			rf_al.sort((a,b) => a.c - b.c);
		}
		else{
			cp = false;
			em = 'number of provided rates is incorrect';
		}
		if(wb_al.length == rf_al.length){
			for(p=0;p<wb_al.length;p++){
				if(wb_al[p].c == rf_al[p].c && wb_al[p].cr == rf_al[p].cr && wb_al[p].l == rf_al[p].l){
					uip = true;
				}
				else{
					uip = false;
					break;
					break;
				}
			}
		}
	}
	else if(fm == 2){
		uip = false;
		rf_al = [];
		rf_dt = [];
		let a0 = []
		for(i=0;i<rates2.data.length;i++){
			let a1 = []
			for(j=0;j<rates2.data[i][1].length;j++){
				let ar = []
				rf_al.push({c:i,cr:rates2.data[i][1][j][0],l:rates2.data[i][1][j].length - 1});
				for(o=0;o<rates2.data[i][1][j].length;o++){
					ar.push(rates2.data[i][1][j][o]);
				}
				a1.push(ar);
			}
			a0.push(a1);
			rt_ah.push(rates2.data[i][0]);
		}
		rf_dt.push(a0);
		if(wb_al.length == rf_al.length){
			for(p=0;p<wb_al.length;p++){
				if(wb_al[p].c == rf_al[p].c && wb_al[p].cr == rf_al[p].cr && wb_al[p].l == rf_al[p].l){
					uip = true;
				}
				else{
					uip = false;
					break;
					break;
				}
			}
		}
	}
	if(uip){
		for(h=0;h<wb_l;h++){
			let wb_t = wb.children[h].children[2].children[0].children[0];
			for(i=0;i<wb_t.children.length;i++){
				for(j=0;j<wb_t.children[i].children.length;j++){
					wb_t.children[i].children[j].children[0].innerHTML = rf_dt[0][h][i][j];
				}
			}
		}
	}
	else{
		if(fmode == 1){populateRates()}
		else if(fmode == 2){populateRates2()}
	}
	if(uit === null){
		uit = setInterval(function(){fetchData()},1000 * 300);
	}
}

fetchData();