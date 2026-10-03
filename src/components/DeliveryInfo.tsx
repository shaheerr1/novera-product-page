"use client";

import { useSyncExternalStore } from "react";
import { formatDeliveryRange, getDeliveryRange } from "@/lib/delivery";
import { BoxIcon, CalendarIcon } from "./icons";

const subscribe = () => () => {};
// The page is statically rendered, so today's date is read in the browser only.
// The date string is a stable snapshot for the whole day.
const getToday = () => new Date().toDateString();
const getServerToday = () => null;

export default function DeliveryInfo() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const range = today ? formatDeliveryRange(getDeliveryRange(new Date(today))) : null;

  return (
    <dl className="delivery-info">
      <div className="delivery-info__row">
        <dt className="delivery-info__label">
          <BoxIcon className="delivery-info__icon" />
          Estimated Delivery:
        </dt>
        <dd className="delivery-info__value">Within 4 Days</dd>
      </div>
      <div className="delivery-info__row">
        <dt className="delivery-info__label">
          <CalendarIcon className="delivery-info__icon" />
          Delivery Date:
        </dt>
        <dd className="delivery-info__value">{range ?? " "}</dd>
      </div>
    </dl>
  );
}
