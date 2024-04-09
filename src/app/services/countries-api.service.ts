import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesAPIService {

  countriesList = [];
  allCountriesList = [];
  allCountriesNames = [];
  citiesListByCountry = [];
  allCitiesListByCountry = [];
  allCitiesNamesByCountry = [];

  constructor() {
    this.getCountries();
  }

  private getCountries(): void {

    const requestOptions = CountriesAPIService.apiSetUp();

    fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
      .then(response => response.text())
      .then(result => {
        this.countriesList = JSON.parse(result);
        this.allCountriesList = this.countriesList;
        this.pushCountriesNames();
      })
      .catch(error => console.log('error', error));
  }

  pushCountriesNames(): void {
    this.allCountriesList.forEach(country => {
      this.allCountriesNames.push(country.name);
    })
  }

  getCities(iso2): void {

    const requestOptions = CountriesAPIService.apiSetUp();

    fetch('https://api.countrystatecity.in/v1/countries/' + iso2 + '/cities', requestOptions)
      .then(response => response.text())
      .then(result => {
        this.citiesListByCountry = JSON.parse(result);
        this.allCitiesListByCountry = this.citiesListByCountry
        this.pushCitiesNames();
      })
      .catch(error => console.log('error', error));
  }

  pushCitiesNames(): void {
    this.allCitiesListByCountry.forEach(city => {
      this.allCitiesNamesByCountry.push(city.name);
    })
  }

  static apiSetUp(): any {
    const headers = new Headers();
    headers.append('X-CSCAPI-KEY', 'UmtLNzJHQnA2YlJwR0U0N3I2b1Q2U0RhVUM0MEgxajBJdUY2ZFFGaw==');

    return {
      method: 'GET',
      headers: headers,
    };
  }
}
