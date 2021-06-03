/**
 * Delete emails mark with "8hr delete" label after ~8hrs-ish.
 * 
 * Setup: Hourly trigger.
 * Usage: Filters automatically assign "8hr delete" label to certain emails that are only useful within a short period of time.
 * Example: Food delivery emails that are useless after you eat your food, uber, etc..
 */
const LABEL_NAME = "8hr delete";
const CUTOFF = (60 * 60 * 8);

function delete8hrEmails() {
  const label = GmailApp.getUserLabelByName(LABEL_NAME);
  const currentDate = Date.now();
  const threads = label.getThreads();
  let lastDate = 0;
  
  for (var i = 0; i < threads.length; i++) {
    lastDate = Date.parse(threads[i].getLastMessageDate());
    if (lastDate <= (currentDate - CUTOFF)) {
      threads[i].moveToTrash();
    }
  }
};
