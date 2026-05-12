import { useEffect } from "react";

import PageShell from "../Components/Common/PageShell";

import { useTheme } from "../context/ThemeContext";

import { useNotifications } from "../context/NotificationsContext";

import { topicLabelEn } from "../utils/notificationLabels";

import { 

  Bell, 

  RefreshCw, 

  Trash2, 

  User, 

  Film, 

  Calendar, 

  Clock

} from "lucide-react";


export default function Notifications() {
  const { isDarkMode, colors } = useTheme();
  const { items, markAllRead, refreshFromApi, deleteAllNotifications, deleteNotification } = useNotifications();


  useEffect(() => {

    void refreshFromApi();

    markAllRead();

  }, [markAllRead, refreshFromApi]);



  const getNotificationIcon = (topic) => {

    if (topic.includes('user')) return <User size={20} />;

    if (topic.includes('movie')) return <Film size={20} />;

    if (topic.includes('booking')) return <Calendar size={20} />;

    return <Bell size={20} />;

  };



  const getNotificationColor = (topic) => {

    if (topic.includes('user')) return isDarkMode ? '#a855f7' : '#9333ea';

    if (topic.includes('movie')) return isDarkMode ? '#3b82f6' : '#2563eb';

    if (topic.includes('booking')) return isDarkMode ? '#22c55e' : '#16a34a';

    return isDarkMode ? '#f59e0b' : '#d97706';

  };



  return (

    <PageShell title="Notifications">

      <div className="flex flex-col gap-4">

        <div className="flex flex-wrap items-center justify-between gap-2">

          <p

            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}

          >

            History loads from the database via the API; live updates arrive from Kafka

            over WebSocket.

          </p>

          {items.length > 0 && (

            <button

              type="button"

              onClick={deleteAllNotifications}

              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:opacity-80"

              style={{

                borderColor: colors.primary,

                color: colors.primary,

              }}

            >

              <Trash2 size={16} />

              Clear All

            </button>

          )}

        </div>



        {items.length === 0 ? (

          <div className={`flex flex-col items-center justify-center py-16 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>

            <Bell size={48} className="mb-4 opacity-50" />

            <p className="text-center max-w-md">

              No notifications yet. After sign-in, history is loaded from MySQL; new events

              appear here with a sound alert.

            </p>

          </div>

        ) : (

          <ul className="space-y-3">

            {items.map((n) => (

              <li

                key={n.id}

                className={`rounded-xl border p-4 text-left transition-all hover:shadow-lg ${

                  isDarkMode

                    ? "border-white/10 bg-gray-950/80 hover:border-white/20"

                    : "border-gray-200 bg-gray-50 hover:border-gray-300"

                }`}

              >

                <div className="flex items-start gap-3">

                  <div 

                    className="p-2 rounded-lg flex-shrink-0"

                    style={{ backgroundColor: `${getNotificationColor(n.topic)}20` }}

                  >

                    <div style={{ color: getNotificationColor(n.topic) }}>

                      {getNotificationIcon(n.topic)}

                    </div>

                  </div>

                  

                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">

                      <span 

                        className="font-semibold text-base"

                        style={{ color: colors.primary }}

                      >

                        {n.title}

                      </span>

                      <div className="flex items-center gap-2 text-xs">

                        <Clock size={12} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />

                        <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>

                          {n.timestamp}

                        </span>

                      </div>

                    </div>

                    

                    <div className="flex items-center justify-between gap-2 mb-3">

                      <span

                        className="text-xs font-medium px-2 py-1 rounded-full"

                        style={{

                          backgroundColor: `${getNotificationColor(n.topic)}20`,

                          color: getNotificationColor(n.topic)

                        }}

                      >

                        {topicLabelEn(n.topic)}

                      </span>

                      <button

                        onClick={() => deleteNotification(n.id)}

                        className="text-xs px-2 py-1 rounded-lg border transition-colors hover:opacity-80"

                        style={{

                          borderColor: colors.primary,

                          color: colors.primary,

                        }}

                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              </li>

            ))}

          </ul>

        )}

      </div>

    </PageShell>

  );

}

