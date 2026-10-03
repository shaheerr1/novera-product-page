"use client";

import { useSyncExternalStore } from "react";
import { formatDeliveryRange, getDeliveryRange } from "@/lib/delivery";
import { BoxIcon, CalendarIcon } from "./icons";

// Same shape as a real range ("Oct 08-12"), so the placeholder reserves its width.
const PLACEHOLDER_RANGE = "Oct 00-00";

// The page is prerendered at build time, so "today" must come from the
// visitor's browser, never the server. useSyncExternalStore renders the server
// snapshot (null, so the placeholder) in the prerendered HTML and during
// hydration, so the two match, then immediately re-renders with the browser's
// date. The date string is a stable snapshot for the whole day.
const subscribe = () => () => {};
const getBrowserToday = () => new Date().toDateString();
const getServerToday = () => null;

export default function DeliveryInfo() {
  const today = useSyncExternalStore(subscribe, getBrowserToday, getServerToday);
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
        <dd className="delivery-info__value" aria-live="polite">
          {range ?? (
            <>
              <span className="visually-hidden">Calculating delivery date</span>
              <span className="delivery-info__placeholder" aria-hidden="true">
                {PLACEHOLDER_RANGE}
              </span>
            </>
          )}
        </dd>
      </div>
    </dl>
  );
}
