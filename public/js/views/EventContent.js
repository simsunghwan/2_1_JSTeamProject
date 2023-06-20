export default class EventContent{
    constructor() {
      document.title = "EventContent";
        if (document.querySelector('main-element')) {
        this.index = document.querySelector('main-element').dataset.index;
      }
      else if (document.querySelector('main-admin-element')) {
        this.index = document.querySelector('main-admin-element').dataset.index;
      }
    }
  
    async eventFunction() {}
    
      async getHtml() {
        console.log("complete1");
        const resProduct = await fetch("/event");
        const dataProduct = await resProduct.json(); 
        const self = this;

        console.log(this.index);
        const productRows = dataProduct.map(event => {
        if(event.id == this.index){
          return `
          <div class="slide-box">
            <table class="table table-striped table-wrapper">
              <tbody class="table-row table-cell table-dark">
                <tr>
                  <td class="text-center">
                    <img alt="non" src="${event.image}" >
                  </td>
                </tr>
                <tr>
                  <td>${event.name}
                  <hr><p class="psize">
                  ${event.desc}
                  </p>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
          `;}
        }).join("");
        console.log("complete2");
        
    
        return `
          <!-- 조원 소개 -->
            
          <div class='container' id="intro" style="overflow: hidden;">
            <div>
              <h2 class="intro-title">진행 중인 이벤트</h2>
              <br><br><br>
            </div>
            <div id="sc" class="slide-container">
              ${productRows}
            </div>
          </div>
        `;
      }
  }