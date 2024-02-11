import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchCars } from "../utils";
import { CarType } from "../types";
import { fuels, years } from "../constants/index";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CustomFilter from "../components/CustomFilter/index";
import Card from "../components/Card";
import ShowMore from "../components/ShowMore";

const MainPage = () => {
  // Define the state and the type of the data to be stored in the state
  const [cars, setCars] = useState<CarType[]>([]);
  // @ts-ignore
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    // Extract all parameters from the URL and create an object
    const paramsObj = Object.fromEntries(params.entries());

    // Fetch car data based on parameters
    fetchCars(paramsObj).then((res: CarType[]) => setCars(res));
  }, [params]);

  return (
    <div>
      <Hero />

      <div id="catalogue" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Explore our Car Selection</h1>
          <p>Find vehicles that match your preferences!</p>
        </div>

        {/* Filtering Area */}
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="Fuel Type" options={fuels} />
            <CustomFilter title="Year of Production" options={years} />
          </div>
        </div>

        {!cars || cars.length < 1 ? (
          // Display a warning if no cars are found
          <div className="home__error-container">
            <h2>Sorry, No Results Found</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car, i) => (
                <Card key={i} car={car} />
              ))}
            </div>
            <ShowMore />
          </section>
        )}
      </div>
    </div>
  );
};

export default MainPage;
