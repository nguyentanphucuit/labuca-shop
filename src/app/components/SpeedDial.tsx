import PhoneSpeedDial from "./PhoneSpeedDial";
import ZaloSpeedDial from "./ZaloSpeedDial";

const SpeedDial = () => {
  return (
    <>
      {/* Mobile: Column layout on right */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <PhoneSpeedDial />
        <ZaloSpeedDial />
      </div>

      {/* Desktop: Original layout (Phone on left, Zalo on right) */}
      <div className="hidden lg:block">
        <div className="fixed bottom-6 left-6 z-50">
          <PhoneSpeedDial />
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <ZaloSpeedDial />
        </div>
      </div>
    </>
  );
};

export default SpeedDial;
