(() => {
    const throttle = (fn, delay) => {
      let last = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - last < delay) {
          return;
        }
        last = now;
        return fn(...args);
      };
    };
  
    const logProduct = throttle(() => {
      [...document.querySelectorAll(".ProductCard__content")]
        .filter(unique)
        .filter(elementIsInViewport)
        .forEach((element) => {
          const priceNoReduc = element?.querySelector(".ProductCard__price")?.innerText
          const priceReduc = element?.querySelector(
            ".ProductCard__price .hasReduction"
          )?.innerText;
          const name = element.querySelector(".ProductCard__title").innerText;
          const price =  priceReduc  ?? priceNoReduc 

  
          console.log(name, price);
          element.dataset.dejaVu = "1";
        });
    }, 1000);
  
    function elementIsInViewport(element) {
      const bounding = element.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= window.innerHeight &&
        bounding.right <= window.innerWidth
      );
    }
  
    function unique(element) {
      return element.dataset.dejaVu !== "1";
    }
  
    document.addEventListener("scroll", logProduct);
  })();
  