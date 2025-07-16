import styles from './SearchList.module.css';

export type Item = {
  id: string;
  name: string;
  abbrev: string;
  originalIndex: number;
};

type SearchListProps = {
  list?: Array<Item>;
  setSearchValue: (value: string) => void;
  setIsShowingList: (value: boolean) => void;
};

const SearchList = (props: SearchListProps) => {
  const { list, setSearchValue, setIsShowingList } = props;

  const clickItem = (name: string, index: number) => {
    setSearchValue(name);
    setIsShowingList(false);
    // globalDispatch({ type: 'SET_ACTIVE_DEVICE', index });
    // globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'details' });
  };

  return (
    <div className={styles.listContainer}>
      {list?.map((item) => (
        <div key={item.id} className={styles.listItem} onClick={() => clickItem(item.name, item.originalIndex)}>
          <span className={styles.shrinkText}>{item.name}</span>
          <span className={styles.abbrev}>{item.abbrev}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
