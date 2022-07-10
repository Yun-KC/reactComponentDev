export const MOVIE_DETIAL_MODAL_TYPE = "MOVIE_DETIAL_MODAL_TYPE";
export class MovieDetialModalVO {
  constructor(data, onSubmit) {
    this.data = data;
    this.onSubmit = onSubmit;
  }
}
