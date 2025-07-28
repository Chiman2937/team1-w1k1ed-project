interface IndexItem {
  level: number;
  text: string;
}

interface Props {
  indexList: IndexItem[];
}

const ProfileIndex = ({ indexList }: Props) => {
  return (
    <div className='shrink-0 xl:fixed xl:top-[108px] xl:left-[20px] border-1 border-gray-300 bg-white min-w-[200px] p-[10px] xl:ml-0'>
      <p>목차</p>
      {indexList.map((item, index) => (
        <p key={index}>{item.text}</p>
      ))}
    </div>
  );
};

export default ProfileIndex;
