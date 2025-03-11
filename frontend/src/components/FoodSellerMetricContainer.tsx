import styles from "../styles/FoodMetricSellerContainer.module.css"
export default function FoodMetricSellerContainer() {
    return (
      <div className= {styles["food-type-sellers-container"]}>
          <div className={styles["food-metric-image-container"]}>Image here</div>
          <div>Name</div>
          <div>Units</div>
      </div>     
    )
  }