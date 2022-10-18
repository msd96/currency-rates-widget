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
const dm = "document.querySelectorAll";
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
			"USD":"10.1000",
			"RUB":"0.1550",
			"EUR":"9.7000",
			"CNY":"1.3500"
		},
		"EXCHSell": {
			"USD":"10.2000",
			"RUB":"0.1600",
			"EUR":"1000",
			"CNY":"1.5000"
		},
		"MTBuy": {
			"USD":"10.0800",
			"RUB":"0.1590",
			"EUR":"9.7500",
			"CNY":"1.3500"
		},
		"MTSell": {
			"USD":"10.2000",
			"RUB":"0.1630",
			"EUR":"1000",
			"CNY":"1.5000"
		},
		"NonCashExchBuy": {
			"USD":"10.0800",
			"RUB":"0.1590",
			"EUR":"9.7500",
			"CNY":"1.3500"
		},
		"NonCashExchSell": {
			"USD":"10.2000",
			"RUB":"0.1630",
			"EUR":"1000",
			"CNY":"1.5000"
		},
		"BDate": "2022-10-18"
	}
]
//converting old json to new Array
let newratesinit = [];
let newrates = [];
let nbtrate = {};
for(x in rates[0]){
    if(rates[0].hasOwnProperty(x)){
    	if(x !== "NBT" && x !== "BDate"){
			let crncies = [];
			let values = [];
			for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y)}};
			for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){values.push(rates[0][x][y])}};
            eval("newratesinit.push({" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "})");
    	}
		if(x == "NBT"){
			let crncies = [];
			let values = [];
			for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){crncies.push(y)}};
			for(y in rates[0][x]){if(rates[0][x].hasOwnProperty(y)){values.push(rates[0][x][y])}};
			eval("nbtrate = {" + x.toString() + ":" + JSON.stringify(rates[0][x]) + ",c:" + JSON.stringify(crncies) + ",v:" + JSON.stringify(values) + "}");
		}
    }
}

let rates_new = {
	  "data": [
		[
		  "Cash_Rate",
		  [
			[
			  "USD",
			  "10.1000",
			  "10.2000",
			  "10.2180"
			],
			[
			  "RUB",
			  "0.1560",
			  "0.1610",
			  "0.1610"
			],
			[
			  "EUR",
			  "10.0000",
			  "10.0000",
			  "9.9493"
			],
			[
			  "CNY",
			  "1.3500",
			  "1.5000",
			  "1.4188"
			]
		  ]
		],
		[
		  "NonCash_Rate",
		  [
			[
			  "USD",
			  "10.1000",
			  "10.2000",
			  "10.2180"
			],
			[
			  "RUB",
			  "0.1560",
			  "0.1610",
			  "0.1610"
			],
			[
			  "EUR",
			  "10.0000",
			  "10.0000",
			  "9.9493"
			],
			[
			  "CNY",
			  "1.3500",
			  "1.5000",
			  "1.4188"
			]
		  ]
		],
		[
		  "MoneyTransfer_Rate",
		  [
			[
			  "USD",
			  "10.0800",
			  "10.1800",
			  "10.2180"
			],
			[
			  "RUB",
			  "0.1610",
			  "0.1650",
			  "0.1610"
			],
			[
			  "EUR",
			  "9.7500",
			  "10.0000",
			  "9.9493"
			],
			[
			  "CNY",
			  "1.3500",
			  "1.5000",
			  "1.4188"
			]
		  ]
		]
	  ],
	  "bdate": "2022-10-18"
	};

function populateRates(){
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
function populateRates_new(){
	let rc = document.querySelectorAll(".widget .w-b")[0]
	rc.innerHTML = "";
	let nrsize = rates_new.data.length;
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
	let newrates = rates_new.data;
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

if(rates_new !== undefined && rates_new !== null){
	if(rates_new.data.length > 0){
		populateRates_new();
	}
}
else {
	if(rates !== undefined && rates !== null){
		if((typeof rates === "object" || typeof rates === 'function') && (rates !== null)){
			populateRates();
		}
		else{
			console.log("exchange rate were not loaded properly");
		}
	}
	else{
		console.log("exchange rate were not found");
	}
}
