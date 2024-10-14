import { Search, X } from 'lucide-react';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import { useFilterStore } from '@/state/useFilterStore';

const ListingsFilter = () => {
  const { setFilters } = useFilterStore();
  const navigate = useNavigate();

  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleFilters = () => {
    setFilters({
      to: dates?.to,
      from: dates?.from,
      guests,
      search,
    });
    navigate('/');
  };

  const resetFilters = () => {
    setFilters({
      to: undefined,
      from: undefined,
      guests: 0,
      search: '',
    });
    setDates(undefined);
    setGuests(0);
    setSearch('');
    navigate('/');
  };

  return (
    <>
      <div className='sm:flex sm:flex-row sm:justify-start'>
        <div className='flex flex-row items-center justify-between'>
          <Input
            placeholder='Where?'
            className='w-full rounded-full border border-none px-2 hover:bg-muted hover:placeholder:text-primary focus-visible:ring-0 sm:text-lg'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Stepper
            label='guest'
            className='rounded-full border border-none px-2 hover:bg-muted sm:min-w-[200px] sm:text-lg'
            value={guests}
            onChange={setGuests}
          />
        </div>
        <div>
          <DateRangePicker
            buttonClassName='border border-none rounded-full hover:bg-muted hover:text-primary px-2 w-full sm:w-[270px] sm:text-lg'
            value={dates}
            onChange={setDates}
            minDate={new Date()}
            placeholder='When?'
          />
        </div>
      </div>

      <div className='flex flex-row items-center gap-2'>
        <Button
          className=' w-full rounded-full sm:w-14'
          onClick={handleFilters}
        >
          <Search />
        </Button>
        {dates !== undefined || guests !== 0 || search !== '' ? (
          <Button
            variant='destructive'
            className='rounded-full sm:w-14'
            onClick={resetFilters}
          >
            <X />
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default memo(ListingsFilter);
