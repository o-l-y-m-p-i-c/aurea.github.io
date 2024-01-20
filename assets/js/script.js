
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 3.2,
    spaceBetween: 20,
    
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints:{
        '320': {
            slidesPerView: 1.25,
          },
        '1000': {
            slidesPerView: 3.2,
          },
    }
  });
  

gsap.registerPlugin(ScrollTrigger);

let revealContainers = document.querySelectorAll(".reveal");

let titleReveal = document.querySelectorAll(".title_reveal");

revealContainers.forEach((container) => {
  let image = container.querySelector("img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      // toggleActions: "restart none none reset",
    }
  });
  
  if(container.classList.contains('parallax')){
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
      },
    }); 
    tl2.from(image, {
      // scaleY: 1.6,
      transformOrigin: "50% 50%",
      yPercent: -30,
      ease: "none",
    }).to(image, {
      transformOrigin: "50% 50%",
      // scale: 1.6,
      yPercent: 30,
      ease: "none",
    }); 
  }

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5, {
    xPercent: -100,
    ease: Power2.out
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.6,
    delay: -1.5,
    ease: Power2.out
  })
  
});


titleReveal.forEach((container) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "center center",
      // className: '+=active'
      toggleClass: "active",
      scrub: true,
      pin: false,
      // toggleActions: "restart none none reset",
    }
  });


})



// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// const smoother = ScrollSmoother.create({
//  content: ".banner_bg",
//  smooth: 3,
// //  effects: true
// });

// smoother.effects(".banner_bg", { speed: "auto" });

function tabber (activeationIndex){
  
  const tabWraps = document.querySelectorAll('.js-tabs')

  
  tabWraps.forEach(tabWrap => {
    const tabs = tabWrap.querySelectorAll('.tab-head_list li')
    const contents = tabWrap.querySelectorAll('.tab-content')
    const contentWrap = tabWrap.querySelector('.tab-content_wrap')
    const imgs = tabWrap.querySelectorAll('.img')


    tabs.forEach((_tab,index) =>{
      if(activeationIndex !== false && typeof activeationIndex === 'number'){
        initTab(tabs,contents,activeationIndex,contentWrap,imgs)
      }

      _tab.onclick = (e) => {
        initTab(tabs, contents, index,contentWrap ,imgs)

      }
    })
  })
  function initTab(tabs,contents,index,contentWrap, imgs){
    // if(!e){
    //   return
    // }

    console.log(tabs,contents,index,contentWrap, imgs)

    let foundTab = null
    let foundContent = null


    tabs.forEach((tab,_index) =>{
      if(index === _index){
        foundTab = tab
        tab.classList.add('active')
      }else{
        tab.classList.remove('active')
      }
    })


    contents.forEach((content,_index) =>{
      if(index === _index){
        foundContent = content
        content.classList.add('active')
      }else{
        content.classList.remove('active')
      }
      
    })

    imgs.forEach((img,_index) =>{
      if(index === _index){
        img.classList.add('active')
      }else{
        img.classList.remove('active')
      }
    })

    if(foundTab && foundContent){
      if(contentWrap.querySelector('.noResults') !== null){
        contentWrap.querySelector('.noResults').remove()
      }
    }else{
      const div = document.createElement('div')
      div.classList.add('active')
      div.classList.add('noResults')
      div.classList.add('tab-content')
      div.style.marginTop = '20px'
      div.innerHTML = 'This tab is empty'
      if(!contentWrap.querySelector('.noResults')){
        contentWrap.appendChild(div)
      }
     
    }
  }
}


tabber(0)