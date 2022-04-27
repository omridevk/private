import "./EventNotification.scss";
import React from "react";
import LevelBar from "./LevelBar";

import type { CarData } from "../api/data-generator";

interface EventNotificationProps {
  carEvent: CarData;
  color?: string;
}

const EventNotification = ({
  carEvent: { vin, timestamp, fuel, wiperFluid, location },
  color = '#00c3e8',
}: EventNotificationProps) => {
  return (
    <article className="car-event">
      <section className="car-event__vin" style={{ backgroundColor: color }}>
        {vin}
      </section>
      <main className="car-event__body">
        <div className="car-event__stats">
          <div className="car-event__stat car-event__fuel">
            <span className="car-event__label">Fuel Level:</span>
            <span className="car-event__value">
              <LevelBar width={180} fraction={fuel} />
            </span>
          </div>
          <div className="car-event__stat car-event__wiper-fluid">
            <span className="car-event__label">Wiper Fluid:</span>
            <span className="car-event__value">
              <LevelBar width={180} fraction={wiperFluid} />
            </span>
          </div>
          <div className="car-event__stat car-event__location">
            <span className="car-event__label">Location:</span>
            <span className="car-event__value">{JSON.stringify(location)}</span>
          </div>
        </div>
        <div className="car-event__time">
          {new Date(timestamp).toLocaleString('en-GB')}
        </div>
      </main>
    </article>
  )
}

export default EventNotification
