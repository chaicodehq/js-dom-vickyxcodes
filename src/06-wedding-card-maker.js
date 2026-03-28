/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if(!containerElement) return null;

  containerElement.addEventListener("click", (e)=>{
    if(e.target.closest(".remove-btn")){
      e.target.closest(".guest-item").remove();
    }
  })

  return {
    addGuest(name, side){
      const div = document.createElement("div");
      div.classList.add("guest-item");

      // div.setAttribute("data-name", name);
      div.dataset.name = name;
      div.setAttribute("data-side", side);

      const span = document.createElement("span");
      span.textContent = name;
      div.appendChild(span);

      const btn = document.createElement("button");
      btn.classList.add("remove-btn");
      btn.textContent = "Remove";
      div.appendChild(btn);

      containerElement.appendChild(div);
      return div;
    },

    removeGuest(name){
      const items = containerElement.querySelectorAll(".guest-item");
      for(let item of items){
        if(item.getAttribute("data-name") === name){
            item.remove();
            return true;
        }
      }

      return false;
    },

    getGuests(){
      const items = containerElement.querySelectorAll(".guest-item");
      const arr = [];

      items.forEach(item => {
        const name = item.dataset.name;
        const side = item.dataset.side;

        arr.push({name, side});
      });

      return arr;
    }
  }
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null;

  const btn1 = document.createElement("button");
  btn1.classList.add("theme-btn");
  btn1.dataset.theme = "traditional";
  btn1.textContent = "traditional";

  containerElement.appendChild(btn1);

  const btn2 = document.createElement("button");
  btn2.classList.add("theme-btn");
  btn2.dataset.theme = "modern";
  btn2.textContent = "modern";

  containerElement.appendChild(btn2);

  const btn3 = document.createElement("button");
  btn3.classList.add("theme-btn");
  btn3.dataset.theme = "royal";
  btn3.textContent = "royal";

  containerElement.appendChild(btn3);


  containerElement.addEventListener("click", (e)=>{
    if(e.target.closest(".theme-btn")){
      previewElement.className = e.target.dataset.theme;
      previewElement.dataset.theme = e.target.textContent;
    }
  })

  return {
    getTheme(){
      return previewElement.dataset.theme || null;
    }
  }
}

export function setupCardEditor(cardElement) {

  if (!cardElement) return null;

  cardElement.addEventListener("click", (e)=>{
    const editableEl = e.target.closest("[data-editable]");

    if(editableEl && cardElement.contains(editableEl)){
      const baki = cardElement.querySelector(".editing");

      if(baki){
        baki.classList.remove("editing");
        baki.contentEditable = "false";
      }

      editableEl.classList.add("editing");
      editableEl.contentEditable = "true";


    } else {
      const baki = cardElement.querySelector(".editing");

      if(baki){
        baki.classList.remove("editing");
        baki.removeAttribute("contenteditable");
      }
    }
  });

  return {
    getContent(field){
      const found = cardElement.querySelector(`[data-editable="${field}"]`);
      return found ? found.textContent : null;
    }
  }
}
