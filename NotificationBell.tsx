import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationBellProps {
  notifications?: Notification[];
  onNotificationClick?: (id: string) => void;
  onClear?: () => void;
}

export function NotificationBell({
  notifications = [],
  onNotificationClick,
  onClear,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-primary" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "info":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-card border-border/50";
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600"
              variant="default"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>

        {notifications.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-border/30 last:border-0 cursor-pointer hover:bg-card/50 transition-colors ${
                  getTypeColor(notification.type)
                }`}
                onClick={() => {
                  onNotificationClick?.(notification.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
