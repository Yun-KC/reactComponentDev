export const MOVIE_DETIAL_MODAL_TYPE = "MOVIE_DETIAL_MODAL_TYPE";

export class MovieDetialModalVO {
  // TODO: data 유효성 검사
  constructor(data) {
    this.title = data.title;
    this.year = data.year;
    this.rating = data.rating;
    this.summary = data.summary;
    this.background_image = new Image();
    this.background_image.src = data.background_image;
    this.cover_image = new Image();
    this.cover_image.src = data.cover_image;
    this.like = data.like;
  }
}
/*
const data = {
  title: "Moana",
  year: 2016,
  rating: 7.6,
  summary:
    "Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
  background_image: "https://yts.mx/assets/images/movies/moana_2016/background.jpg",
  cover_image: "https://yts.mx/assets/images/movies/moana_2016/large-cover.jpg",
  like: false,
}
*/
