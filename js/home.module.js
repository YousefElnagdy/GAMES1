
import { Ui } from "./ui.module.js";
import {Details} from "./details.module.js"
// import { Details } from "./details.module.js"


export class Home {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.displayGameDataOnLoad();
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        this.changeActiveLink(link);
      })
    })

    this.loading = document.querySelector('.loading')
    this.details = document.getElementById('details')
    this.home = document.getElementById('home')

    this.ui = new Ui();
  }

  async displayGameDataOnLoad() {
    const defaultCategory = 'action'; // Example category, change it as needed
    await this.handleCategoryData(defaultCategory);
  }

  async changeActiveLink(link) {
    document.querySelector('.navbar-nav .active').classList.remove('active');
    link.classList.add('active')

    const category = link.dataset.category;
    console.log(category);

    await this.handleCategoryData(category);
  }

  async handleCategoryData(category) {
    const categoryData = await this.getGame(category);
    if (categoryData && Array.isArray(categoryData)) {
      this.ui.displayDataGame(categoryData);
    } else {
      console.error("Invalid data provided!");
    }
  }

  async getGame(cat) {
    this.loading.classList.remove('d-none')
    const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "a1f2e1d0camsh8b39f18c7898991p1ff575jsnf0e98aae5292",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         Accept: "application/json",
         "Content-Type": "application/json",
      },
  }
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?=${cat}`, options)
    const response = await api.json();
    console.log(response);
    this.loading.classList.add('d-none')
    this.ui.displayDataGame(response)


    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        this.details.classList.remove('d-none')
        this.home.classList.add('d-none')
        this.detailsSection = new Details(card.dataset.id)

      })
    })
    
  }



}
