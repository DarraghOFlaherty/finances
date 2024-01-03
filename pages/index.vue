<template>
  <div class="flex-col flex container">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <div class="flex items-center space-x-2">
          <DialogNewTransaction>
            <Button variant="default">
              Add Transaction
            </Button>
          </DialogNewTransaction>
        </div>
      </div>
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions">
            Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <TabOverview />
        </TabsContent>
        <TabsContent value="transactions">
          <TabTransactions />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
