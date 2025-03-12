import "tsconfig-paths/register";
import express from "express";
import CommonVariables from "@config/index";
import MongoDB from "@database/implementations/mongo/connection";
import { errorHandler } from "@middleware/error.middleware";
import featureRoutes from "@routes/feature.routes";
import gymFeatureRoutes from "@routes/gymfeatures-routes";
import subscriptionRoutes from "@routes/subscription-routes";
import equipmentRoutes from "@routes/equipment-routes";
import exerciseRoutes from "@routes/excercise-routes";
import gymRoutes from "@routes/gym-routes";
import gymBusinessHoursRoutes from "@routes/gymbuisnesshours-routes";
import gymMediaRoutes from "@routes/gymmedia-routes";
import gymLegalInfoRoutes from "@routes/gymlegalinfo-routes";
const app = express();
CommonVariables.Initiate();
const PORT = CommonVariables.PORT;

MongoDB.connect();
app.use(express.json());

// Add this line with your other route registrations
app.use("/api/v1/features", featureRoutes);
app.use("/api/v1/gym-features", gymFeatureRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/equipments", equipmentRoutes);
app.use("/api/v1/exercises", exerciseRoutes);
app.use("/api/v1/gyms", gymRoutes );
app.use("/api/v1/gymbusinesshours", gymBusinessHoursRoutes);
app.use("/api/v1/gymmedia", gymMediaRoutes);
app.use("/api/v1/gymlegalinfo", gymLegalInfoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
