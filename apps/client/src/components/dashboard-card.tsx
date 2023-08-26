import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ReactElement } from "react";

export type CardInfo = {
  title: string;
  description: string;
  amount: string;
  Icon: ReactElement;
}

interface DashboardCardProps {
  data: CardInfo[];
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  data
}) => {
  return (
    <>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <Card key={item.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {item.title}
                  </CardTitle>
                  {item.Icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {item.amount}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}