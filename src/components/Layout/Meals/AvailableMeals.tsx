import React from "react";
import styles from "./AvailableMeals.module.scss";

import MealsItem from "./MealsItem";
import DUMMY_MEALS from "../../store/DUMMY_MEALS";

const AvailableMeals = () => {
  return (
    <section className={styles.meals}>
      <ul className={styles["meals-appear"]}>
        {DUMMY_MEALS.map((meals) => (
          <MealsItem
            key={meals.id}
            name={meals.name}
            description={meals.description}
            price={meals.price}
            id={meals.id}
          />
        ))}
      </ul>
    </section>
  );
};
export default AvailableMeals;
