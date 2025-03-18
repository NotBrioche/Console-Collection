import Item from "./src/item";

const pierre = new Item(
  "Pierre",
  "C'est une pierre, elle peut vous porter compagnie",
  Math.random(),
  []
);

pierre.getObjectInfos();
