////////////////////// 1//////////////////////////////////

function childClass(id, tag) {
	var holder = document.getElementById(id),
	children = holder.childNodes;
	
	for(i = 0; i < children.length; i++) {
		if(children[i].nodeValue === null) {
			children[i].classList.add("element");
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) {    
	childClass('holder', 'div');
});

////////////////////// 2//////////////////////////////////

function alignment(id) {
	var holderChildren = document.getElementById(id).children;

	for(i = 0; i < holderChildren.length; i++) {
		
		var li = holderChildren[i];
		var img = li.children[0];

		img.style.marginLeft = (li.offsetWidth - img.width)/2 + 'px';
		img.style.marginTop = (li.offsetHeight - img.height)/2 + 'px';
		
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	alignment("list-holder");
});


////////////////////// 3//////////////////////////////////

function liChild(obj) {
	var arrUl = document.getElementsByTagName(obj.tag);
	
	for(i = 0; i < arrUl.length; i++) {
		var el = arrUl[i];

		el.children[0].classList.add(obj.firstClass);
		el.children[el.children.length-1].classList.add(obj.lastClass);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	liChild({tag: "ul", firstClass:'first', lastClass: 'last'});
});

////////////////////// 4//////////////////////////////////

var arrAllBlock = [];
var arrHeight =[];

function sumCssStyle(el){
	var style = getComputedStyle(el);

	return parseInt(style.paddingTop,10) + parseInt(style.paddingBottom,10) + parseInt(style.borderTopWidth,10) + parseInt(style.borderBottomWidth,10);
}

function pushArr(a){
	arrAllBlock.push(document.querySelector(a));
	arrHeight.push((document.querySelector(a)).clientHeight);
}

function blockHeight(obj) {

	function findElements(){
		if (Array.isArray(obj.elements)) {
			for (i = 0; i < obj.elements.length; i++) {
				pushArr(obj.elements[i]);
			}
		} else {
			pushArr(obj.elements);
		}
	}
	
	if(!obj.children){
		findElements();
	} else{
		var arrChild = document.querySelector(obj.elements).children;

		for(i = 0; i < arrChild.length; i++){
			arrAllBlock.push(arrChild[i]);
			arrHeight.push(arrChild[i].clientHeight);
		}
	}
	
	var maxHeight = Math.max.apply(null, arrHeight);

	for(i = 0; i < arrAllBlock.length; i++){
		arrAllBlock[i].style.height = (maxHeight - sumCssStyle(arrAllBlock[i])) + "px";
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	blockHeight({
		elements: ["#block1", "#block2"]
	});
	blockHeight({
		elements: [".element", ".container", ".my-box"]
	});
	blockHeight({
		elements: "#list-holder",
		children: true
	});
});

////////////////////// 5//////////////////////////////////

function evenClass(obj) {
	var arrUl = document.getElementsByTagName(obj.tag);
	
	for(i = 0; i < arrUl.length; i++){
		
		var arrLi = [].slice.call(arrUl[i].children);
		var counter = 1;
		
		for(j = 0; j < arrLi.length; j++){
			var newSpan = document.createElement(obj.elementInsert);
			arrLi[j].insertBefore(newSpan, arrLi[j].childNodes[0]).innerHTML = counter + " ";
			
			if(obj.even && !(counter % 2)){
					arrLi[j].classList.add(obj.classInsert);
			} else if(!obj.even && counter % 2 ){
					arrLi[j].classList.add(obj.classInsert);
			}
			
			counter++;
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	evenClass({
		tag: "ul",
		elementInsert: "span",
		classInsert: "alt",
		even: true
	});
});

////////////////////// 6//////////////////////////////////

function clickElement(obj){
	var arrElement = document.getElementsByTagName(obj.element);
	
	function eventHendlerClick(e){
		e.stopPropagation();
		
		var arrChildClick = [].slice.call((this.parentNode).children);
		var numElement = arrChildClick.indexOf(e.target) + 1;
		var numParent = arrChildClick.length;
		
		alert('Number this element : ' + numElement + '\n' + 'Parent ul have  : ' + numParent);
		
	}

	for(i = 0; i < arrElement.length; i++){
		arrElement[i].addEventListener(obj.event, eventHendlerClick, false);
	}
};



document.addEventListener("DOMContentLoaded", function(event) { 
	clickElement({
		element: "li",
		event: "click"
	});
});


//

function clickElement(obj){
	var arrElement = document.querySelectorAll(obj.element);
	
	
	function eventHendlerClick(el, elLehght){
		return function alertParametrs(e){
			e.stopPropagation();
			
			alert('Number this element : ' + (el + 1) + '\n' + 'Parent ul have  : ' + elLehght);
		};
	}

	for(i = 0; i < arrElement.length; i++){
		var arrChild = arrElement[i].children;
		
		for(j = 0; j < arrChild.length; j++){
			arrChild[j].addEventListener(obj.event, eventHendlerClick(j, arrChild.length), false);
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	clickElement({
		element: "ul",
		event: "click"
	});
});

////////////////////// 7//////////////////////////////////

function openClose(obj){
	var arrHolder = document.querySelectorAll(obj.holder);
	
	function eventHendlerClick(){
		var thisHolder = this.closest(obj.holder);
		var thisBox = thisHolder.querySelector(obj.box);

		if(thisHolder.classList.contains(obj.activeClass)) {
			thisHolder.classList.remove(obj.activeClass);
			thisBox.style.display="none";
		} else {
			thisHolder.classList.add(obj.activeClass);
			thisBox.style.display="block";
		}
	}
	
	for(i = 0; i < arrHolder.length; i++){
		var thisOpener = arrHolder[i].querySelector(obj.opener);
		
		thisOpener.addEventListener(obj.event, eventHendlerClick, false);
	}
	
}

document.addEventListener("DOMContentLoaded", function(event) { 
	openClose({
		opener: ".button",
		box: ".box",
		holder: ".holder",
		event: "click",
		activeClass: "active"
	});
});


///////////////


function openClose(obj){
	var arrHolder = document.querySelectorAll(obj.holder);
	
	function eventHendlerClick(myBox, myHolder){
		return function openBlock(){
			if(myHolder.classList.contains(obj.activeClass)) {
				myHolder.classList.remove(obj.activeClass);
				myBox.style.display="none";
			} else {
				myHolder.classList.add(obj.activeClass);
				myBox.style.display="block";
			}
		};
	}
	
	for(i = 0; i < arrHolder.length; i++){
		var thisOpener = arrHolder[i].querySelector(obj.opener);
		var thisBox = arrHolder[i].querySelector(obj.box);
				
		thisOpener.addEventListener(obj.event, eventHendlerClick(thisBox, arrHolder[i]), false);
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	openClose({
		opener: ".button",
		box: ".box",
		holder: ".holder",
		event: "click",
		activeClass: "active"
	});
});

////////////////////// 8//////////////////////////////////

function uploadImg(obj){
	
	var holder = document.querySelector(obj.holderBlock);
	var arrUrl = holder.innerHTML.split(';');
	var randomUrl = arrUrl[Math.floor(Math.random() * arrUrl.length)];
	
	var newImg = document.createElement("img");
	newImg.src = randomUrl;
	
	holder.appendChild(newImg);
	
}

document.addEventListener("DOMContentLoaded", function(event) {
	uploadImg({
		holderBlock: "#visual"
	});
});

///////////////

function uploadImg(obj){
	var arrHolder = document.querySelectorAll(obj.holderBlock);
	function createImg(){
		var newImg = document.createElement("img");
		newImg.src = randomUrl;
		holder.appendChild(newImg);
	}
	
	for(i = 0; i < arrHolder.length; i++){
		var holder = arrHolder[i];
		var arrUrl = holder.innerHTML.split(';');
		var randomUrl = arrUrl[Math.floor(Math.random() * arrUrl.length)];
		
		createImg();
	}
	
}

document.addEventListener("DOMContentLoaded", function(event) {
	uploadImg({
		holderBlock: "#visual"
	});
});

////////////////////// 9//////////////////////////////////
////////////////////// 10//////////////////////////////////
