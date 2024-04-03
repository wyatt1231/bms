import FullCalendar, {
  EventInput,
  EventSourceInput,
} from "@fullcalendar/react";

import "@fullcalendar/daygrid/main.css";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceDayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/timegrid/main.css";
import React, { memo, FC, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../../Services/Store";
import "../../../Component/Calendar/calendar.css";
import EditNewsAdminView from "./EditNewsAdminView";
import ViewSelectedNewsDialog from "./ViewSelectedNewsDialog";
interface ICalNewsAdminView {
  open_edit_dialog: boolean;
  handleSetOpenEditDialog: (open: boolean) => void;
  selected_news_pk: number;
  handleSetSelectedNews: (news_pk: number) => void;
  handleRefetchTable: () => void;
  selected_file_news_pk: number;
  handleSetSelectedFileNewsPk: () => void;
}

export const CalNewsAdminView: FC<ICalNewsAdminView> = memo(
  ({
    open_edit_dialog,
    handleSetOpenEditDialog,
    selected_news_pk,
    handleSetSelectedNews,
    handleRefetchTable,
    selected_file_news_pk,
    handleSetSelectedFileNewsPk,
  }) => {
    const news_table = useSelector(
      (store: RootStore) => store.NewsReducer.news_table
    );

    const fetch_news_table = useSelector(
      (store: RootStore) => store.NewsReducer.fetch_news_table
    );

    const [cal_events, set_cal_events] = useState<EventInput | undefined>();

    console.log(`news_table`, news_table);

    const [selected_event, set_selected_event] = useState<number | null>();

    const handleSetSelectedEvent = useCallback((event_id: number) => {
      set_selected_event(event_id);
    }, []);

    useEffect(() => {
      const events: EventInput = [];

      news_table?.forEach((n, i) => {
        events.push({
          id: n.news_pk + "",
          start: new Date(n.pub_date),
          ...n,
        });
      });

      set_cal_events(events);
    }, [news_table]);

    return (
      <div
        style={{
          backgroundColor: `#fff`,
          padding: `1em`,
          borderRadius: 7,
        }}
      >
        {selected_event && (
          <ViewSelectedNewsDialog
            news_pk={selected_event}
            open={!!selected_event}
            handleClose={() => set_selected_event(null)}
            open_edit_dialog={open_edit_dialog}
            handleSetOpenEditDialog={handleSetOpenEditDialog}
            selected_news_pk={selected_news_pk}
            handleSetSelectedNews={handleSetSelectedNews}
            handleRefetchTable={handleRefetchTable}
            selected_file_news_pk={selected_file_news_pk}
            handleSetSelectedFileNewsPk={handleSetSelectedFileNewsPk}
          />
        )}

        <FullCalendar
          schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
          initialView={"dayGridMonth"}
          plugins={[
            resourceDayGridPlugin,
            resourceTimeGridPlugin,
            interactionPlugin,
          ]}
          events={cal_events}
          eventClick={(arg) => {
            handleSetSelectedEvent(parseInt(arg.event.id));
          }}
          // eventMinHeight={70}
          stickyHeaderDates={true}
          // height={630}
          dayMaxEvents={3}
          aspectRatio={0.8}
          allDaySlot={false}
          eventContent={(e) => {
            const data = e.event;

            return (
              <div
                style={{
                  backgroundColor:
                    data?.extendedProps?.status?.sts_backgroundColor,
                  color: data?.extendedProps?.status?.sts_color,
                  padding: `.35em .5em `,
                  fontSize: `.77em`,
                  display: `grid`,
                  gridAutoFlow: `column`,
                  justifyContent: `start`,
                  alignItems: `center`,
                  alignContent: `center`,
                  gridGap: `.87em`,
                  borderRadius: 5,
                  width: `100%`,
                  border:
                    data?.extendedProps?.is_prio === 1
                      ? `2px solid orange`
                      : ``,
                  boxShadow:
                    data?.extendedProps?.is_prio === 1
                      ? `0 1px 2px  orange`
                      : ``,
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    textTransform: `uppercase`,
                    color: data?.extendedProps?.status?.sts_backgroundColor,
                    backgroundColor: data?.extendedProps?.status?.sts_color,

                    padding: `5px`,
                    borderRadius: `50%`,
                    height: 20,
                    width: 20,
                    textAlign: `center`,
                    display: `grid`,
                    alignItems: `center`,
                    alignContent: `center`,
                    fontSize: `.8em`,
                  }}
                >
                  {data.extendedProps.sts_pk}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: `.8em`,
                  }}
                >
                  {data.title}
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
);

export default CalNewsAdminView;
