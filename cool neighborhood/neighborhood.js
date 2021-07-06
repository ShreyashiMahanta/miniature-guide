AFRAME.registerComponent("tour",{
    schema : {
        state : {type : "string", default : "places-list"},
        selectedPlace: { type: "string", default: "#card1" },
    },
    tick: function() {
        const { state } = this.el.getAttribute("tour");

        if (state === "view") {
          this.hideEl([this.placesContainer]);
          this.showView();
        }
      },
      hideEl: function(elList) {
        elList.map(el => {
          el.setAttribute("visible", true);
        });
          },
    init: function() {
        this.placesContainer = this.el;
        this.cameraEl = document.querySelector("#camera");
        this.createPlaces()
    },
  

    createPlaces : function(){
        const pictures = {
          home : {
            position: { x: -2, y: 2, z: -5.5 },
            rotation: { x: 0, y: 0, z: 0 },
            src: "./assets/home.jpg",
            title: "home",
            id: "home"
          },
          interior : {
            position: { x: 2, y: 2, z: -5.5 },
            rotation: { x: 0, y: 0, z: 0 },
            src: "./assets/interior.jpg",
            title: "interior",
            id: "interior"
          }
        };
        for (var key in pictures) {
            const item = pictures[key];

            const thumbnail = this.createThumbnail(item);
            this.placesContainer.appendChild(thumbnail);
        }
    },
    createThumbnail : function(item){
        const entityEl = document.createElement("a-entity");
        const id = `${item.id}`;
        entityEl.setAttribute("position", item.position);
        entityEl.setAttribute("rotation", item.rotation);
        entityEl.setAttribute("id", id);

        entityEl.setAttribute("material", { src: item.src, opacity: 1});
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "plane",
          });
          entityEl.setAttribute("cursor-listener", {});


        return entityEl;
    },
    showView: function() {
        const { selectedPlace } = this.data;
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {
          src:` ./assets/360_images/${selectedPlace}.jpeg`,
          color: "#fff"
        });
      },
})