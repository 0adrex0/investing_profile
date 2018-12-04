


 'use strict';

 window.onload = function()
 {

 	// Инициализация блога, исправление высоты правого столбика
 	if(document.querySelector('#blog')!=null){
 	    const BlogWatcher = document.querySelector('#blog');
 		if (BlogWatcher) BlogInit();
 	}

 	const ToTop = document.querySelector('.UpBtn');
 		  ToTop.addEventListener('click', () => 
 		  {
 		  		document.body.scrollIntoView({block: "start", behavior: "smooth"});
 		  });

     SwitchPositionArrow();
 	window.addEventListener('scroll', SwitchPositionArrow, false);

 	setTimeout(ShowCookie, 1000);
	const message = document.querySelector('#Message');
	const SignUp  = document.querySelector('#registration');
	const SignIn  = document.querySelector('#logIn');

	const video  = document.querySelector('#video');
	if(video)
	{
		video.addEventListener('click',() => {ShowDialog(video);});
	}

	const circle = document.querySelector('.circle');
	circle.addEventListener('click', () => { ShowDialog(message); });

	const defaultParent = document.querySelector('.default');
	const link = defaultParent.querySelectorAll('a');
	link.forEach( node => 
	{
		if (node.dataset.signup == "true")
		{
			node.addEventListener('click', () => {ShowDialog(SignUp)});
		}
		if (node.dataset.signin == "true")
		{
			node.addEventListener('click', () => {ShowDialog(SignIn)});
		}
	});

	window.addEventListener('resize', fixPosition);
	document.addEventListener('click', (e) => 
	{
		AutoHideDialog(e);
	});
 }

 function BlogInit()
 {
 	const LeftColumn  = document.querySelector('.column-left');
 	const RightColumn = document.querySelector('.column-right');
 	const LeftColumnRect = LeftColumn.getBoundingClientRect();

 		RightColumn.style.height = `${LeftColumnRect.height}px`;
 }

function SwitchPositionArrow()
{
	const ToTop = document.querySelector('.UpBtn');
	const rect = document.body.getBoundingClientRect();
	if (rect.top < -50)
	{
		ToTop.style.bottom = "60px";
	}
	else
	{
		ToTop.style.bottom = "-60px";
	}
	if(document.querySelector('#blog') != null) {
		const fixedSidebar = document.querySelector('.column-right').querySelector('.wrapper');
		const rectFixedSidebar = fixedSidebar.getBoundingClientRect();
		const rectParent = fixedSidebar.parentNode.getBoundingClientRect(); 
		
    	if  (rectFixedSidebar.bottom >= rectParent.bottom || rectFixedSidebar.top < 80)
    	{
			fixedSidebar.style.top = `${rectParent.bottom - rectFixedSidebar.height}px`;
    	}
    	else if (rectFixedSidebar.top >= 80)
    	{
    		fixedSidebar.style.top = "80px";
    	}
	}
}

function ShowCookie() {
  const show =document.querySelector('#cookie');
  if(show.style.display=='block'){
  		show.style.display="none";
  }	
  else{
  	show.style.display="block";
  }
}

function HideVideo(e = null) {
  const video = document.querySelector('.videoBlock');
  const videoContent = video.querySelector('.videoBlock_Container');
  if (e === null)
  {
  	if (video)
	  {
	  	video.remove();
	  }
  }
  else
  {	
  	let skip = false;
  	e.path.forEach( node => 
  	{
  		if (node == videoContent)
  		{
  			skip = true;
  		}
  	});

	if (video && skip === false)
	{
		video.remove();
	}
  }
}

function fixPosition()
{
	const DefaultWindow = document.querySelectorAll('.defaultWindow');
	const container = document.querySelector('.header').querySelector('.container').getBoundingClientRect();
		  DefaultWindow.forEach( node =>
		  {
			  const rectDefaultWindow = node.getBoundingClientRect();
			  	    node.style.left = `${(container.left + container.width) - (rectDefaultWindow.width + 30)}px`;
		  });
		  
}

 function AutoHideDialog( event = null )
 {
	
	const circle = document.querySelector('.circle');
	circle.style.borderColor="#fff";
 	if (event === null)
 	{
 		const dialog = document.querySelectorAll('.defaultWindow');
		  dialog.forEach( node =>
		  {
			node.style.display = "none";
		  });
 	}
	else
	{
		const dialog = document.querySelectorAll('.defaultWindow');
		  dialog.forEach( node =>
		  {
			let Validated = true;
			if (node.style.display === "block")
			{
				event.path.forEach(it => 
				{
					if (it == node)
					{
						Validated = false;
					}
				});
				if (Validated === true)
				{
					
					node.style.display = 'none';
				}
			}
		  });
	}
 }

 function ShowDialog( element )
 {
	const header_Container = document.querySelector('#header').querySelector('.container');
	const header_Container_Style =getComputedStyle(header_Container);

	const header = document.querySelector('#header');
	const header_Style =getComputedStyle(header);
	
	console.log(header_Container_Style.width);
	console.log(header_Style.width);
	console.log( parseInt(header_Style.width) - parseInt(header_Container_Style.width) / 2  );
	
	

	const message = document.querySelector('#Message');
	const SignUp  = document.querySelector('#registration');
	const SignIn  = document.querySelector('#logIn');
	const circle = document.querySelector('.circle');
	const video = document.querySelector('#video');
	const defaultParent = document.querySelector('.default');
	const link = defaultParent.querySelectorAll('a');
	HideDialogs();

	switch (element)
	{
		case video:{
			setTimeout(()=>
				{
					const videoBlock = document.createElement('div');
					const videoClose = document.createElement('div');
					const videoBlock_Cintainer=document.createElement('div');

		 			videoBlock.className = "videoBlock";
		 			videoBlock.addEventListener('click', HideVideo, false);
		 			videoClose.className = 'videoClose';
		 			videoBlock_Cintainer.className = "videoBlock_Container";

		 			videoClose.innerHTML = '<img src="img/icons/close.png" alt="">';
					videoClose.addEventListener('click', () => { HideVideo() }, false);
					 
					const videoWidth = window.innerWidth < 750 ? window.innerWidth-30 : 750;
					const videoHeight = window.innerWidth < 750 ? 200 : 415;
					videoBlock_Cintainer.innerHTML = `<iframe width="${videoWidth}" height="${videoHeight}" src="https://www.youtube.com/embed/BofT-akszU0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
					document.body.appendChild(videoBlock);
					videoBlock.appendChild(videoBlock_Cintainer);
					videoBlock_Cintainer.appendChild(videoClose);

					videoBlock_Cintainer.style.left = `calc(50% - ${videoWidth / 2}px)`;
				});
		}
		case message: 
		{ 
			setTimeout( () => 
			{
				circle.style.border="2px solid #00b7f4";
				element.style.display = "block";
				const rectParent = circle.getBoundingClientRect();
				const rectChild  = element.getBoundingClientRect();
				const rectHeader = document.querySelector('.header').getBoundingClientRect();
				element.style.left = `${(rectParent.left + rectParent.width / 1) - (rectChild.width - 30)}px`;
				element.style.top = rectHeader.top + rectHeader.height  - 1 + 'px';
			
					element.style.left = `${(rectParent.left + rectParent.width / 2) - (rectChild.width - 14)}px`;
				
			});
			
		} break;

		case SignUp:  
		{ 
			setTimeout( () => 
			{
				element.style.display = "block";
				link.forEach( node => 
					{
						if (node.dataset.signup == "true")
						{
							const rectParent = node.getBoundingClientRect();
							const rectChild  = element.getBoundingClientRect();
							const rectHeader = document.querySelector('.header').getBoundingClientRect();
							element.style.top = rectHeader.top + rectHeader.height - 1 + 'px';

							if(window.innerWidth > 1200){
								element.style.left = `${(rectParent.left + rectParent.width / 2) - (rectChild.width - 14)}px`;
							}else{
								element.style.left = `${(rectParent.left + rectParent.width / 2) - (rectChild.width - 18)}px`;							
							}
							
						}
					});


			});
			const showForm = document.getElementById("regForm");
				  showForm.style.display = "block";
			const hidShow = document.getElementById("ShowRegText");
				  hidShow.style.display="none";
		} break;

		case SignIn:  
		{ 
			setTimeout( () => 
			{
				element.style.display = "block";
				link.forEach( node => 
					{
						if (node.dataset.signin == "true")
						{
							const rectParent = node.getBoundingClientRect();
							const rectChild  = element.getBoundingClientRect();
							const rectHeader = document.querySelector('.header').getBoundingClientRect();
															
							element.style.top = rectHeader.top + rectHeader.height  - 1 + 'px';
							if(window>1200){
							element.style.left = `${(rectParent.left + rectParent.width / 2) - (rectChild.width - 30)}px`;
							}
							else{
								element.style.left = `${(rectParent.left + rectParent.width / 2) - (rectChild.width - 22)}px`;							
							}
							
						}
					});
			});
		} break;
	}
}

function HideDialogs()
{
	const circle = document.querySelector('.circle');

	circle.style.borderColor="#fff";

	const dialog = document.querySelectorAll('.defaultWindow');
		  dialog.forEach( node =>
		 {
		 	
			node.style.display = 'none';
			 
		 });
}

//=========================================================================//

function SuccessfulReg(){
	var hide = document.getElementById("regForm");
	var show = document.getElementById("ShowRegText");
	show.style.display="block";
	hide.style.display="none";
}


function SetImg(elem,name){
	switch(name)
	{
		case 'rocket' :
		{
			elem.firstElementChild.src="img/icons/rocket.gif";
			break;
		}
		case 'telegram' :
		{
			elem.src="img/icons/t.png";
			break;
		}
		case 'faleboock' :
		{
			elem.src="img/icons/f.png";
			break;
		}
		case 'vk' :
		{
			elem.src="img/icons/v.png";
			break;
		}
		case 'youtube' :
		{
			elem.src="img/icons/y.png";
			break;
		}
	}
}
function RemoveImg(elem,name){
	switch(name)
	{
		case 'rocket' :
		{
			elem.firstElementChild.src="img/icons/rocket.png";
			break;
		}
		case 'telegram' :
		{
			elem.src="img/icons/telegram.png";
			break;
		}
		case 'faleboock' :
		{
			elem.src="img/icons/faleboock.png";
			break;
		}
		case 'vk' :
		{
			elem.src="img/icons/vk.png";
			break;
		}
		case 'youtube' :
		{			elem.src="img/icons/youtube.png";
			break;
		}
	}

}

function popUp(source) {
	const imgBlock     = document.createElement('div');
	const imgBlock_Box = document.createElement('div');

		imgBlock.addEventListener('click', () => {imgBlock.remove()});
		imgBlock_Box.style.background   = getComputedStyle(source).background;

	const img = document.createElement('img');
		img.src = source.querySelector('.popup').src;

		if (window.innerWidth < 1280)
		{
			imgBlock_Box.style.padding  = "20px";
			img.width = "100%";
			img.height = img.height > window.innerHeight ? window.innerHeight * 0.75 : img.height;
			imgBlock.className        = "popUnderImg";
			imgBlock_Box.className    = "popUnderImg_box";
			imgBlock_Box.style.width  = "calc(100% - 40px)";
			imgBlock_Box.style.height = img.height + "px";
			imgBlock_Box.style.top    = `calc(50% - ${(img.height / 2)}px)`;
			imgBlock_Box.style.left   = "0px";
		}
		else
		{
			imgBlock_Box.style.borderRadius = getComputedStyle(source).borderRadius;
			imgBlock_Box.style.padding = "50px";
			img.width = img.height - img.width > img.width / 2 ? img.width / 1.5 : img.width + "px";
			img.height = img.height - img.width > img.width / 2 ? img.height / 1.5 : img.height + "px";
			imgBlock.className        = "popUnderImg";
			imgBlock_Box.className    = "popUnderImg_box";
			imgBlock_Box.style.width  = img.width + "px";
			imgBlock_Box.style.height = img.height + "px";
			imgBlock_Box.style.top    = `calc(50% - ${(img.height / 2) + 50}px)`;
			imgBlock_Box.style.left   = `calc(50% - ${(img.width / 2) + 50}px)`;
		}

		imgBlock_Box.appendChild(img);
		imgBlock.appendChild(imgBlock_Box);
		document.body.appendChild(imgBlock);

}

function test1(){
	const user1 = document.querySelector('.user');
	const default1 = document.querySelector('.default');

	if(user1.style.display=="block"){
		user1.style.display="none";
		default1.style.display="block";
	}else{
		user1.style.display="block";
		default1.style.display="none";
	}
}
