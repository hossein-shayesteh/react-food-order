import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.scss";
import MealsItem from "./MealsItem";
import { AddItemType } from "../../store/Types";
import Card from "../../UI/Card/Card";
import getRequest from "../../hooks/getRequest";

const AvailableMeals = () => {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">(
    "loading"
  );
  const [meals, setMeals] = useState<AddItemType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRequest(
      "https://react-food-order-4054b-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    )
      .then((response) => {
        setMeals(response);
        setStatus("loaded");
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(error.message);
      });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealsItem
      key={meal.id}
      amount={0}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={styles.meals}>
      {status === "loading" && (
        <div className={styles.loader}>
          <span></span>
        </div>
      )}
      {status === "loaded" && <ul>{mealsList}</ul>}
      {status === "error" && (
        <Card className={styles.error}>{errorMessage}</Card>
      )}
    </section>
  );
};

export default AvailableMeals;
