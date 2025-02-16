type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({
  label,
  icon: Icon,
  iconColor,
  value,
  bgColor,
}: StatsCardProps) => {
  return (
    <div className="bg-neutral-800/30 border-neutral-800 hover:bg-neutral-800/90 rounded-2xl  transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-neutral-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
