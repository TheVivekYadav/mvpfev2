import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

const mockTrip = {
  id: 'bali-2024',
  name: 'Trip to Bali',
  description: 'Planning our upcoming vacation!',
  imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070', // Example image
  members: [
    { name: 'Alex', avatar: 'https://i.pravatar.cc/40?u=alex' },
    { name: 'Ben', avatar: 'https://i.pravatar.cc/40?u=ben' },
    { name: 'Chloe', avatar: 'https://i.pravatar.cc/40?u=chloe' },
  ],
};


export const Route = createFileRoute(
  '/_dashboard/dashboard/_group-detail',
)({
  component: RouteComponent,
})

function RouteComponent() {

  // const { tripId } = useParams({ from: ' });
  const trip = mockTrip;

  const tabStyle = { padding: '10px 20px', textDecoration: 'none', color: '#555', borderBottom: '2px solid transparent' };
  const activeTabStyle = { color: '#007bff', borderBottom: '2px solid #007bff', fontWeight: 'bold' };


  return (<div style={{ maxWidth: '1000px', margin: 'auto' }}>
    {/* 1. Header Banner */}
    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${trip.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '2rem'
      }}>
        <h1 style={{ margin: 0 }}>{trip.name}</h1>
        <p>{trip.description}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff' }}>
        <div>
          <strong>Members:</strong>
          <span style={{ display: 'flex', alignItems: 'center', gap: '-10px', marginLeft: '10px' }}>
            {trip.members.map(m => <img key={m.name} src={m.avatar} alt={m.name} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white' }} />)}
          </span>
        </div>
        <button style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          + Add Expense
        </button>
      </div>
    </div>

    {/* 2. Tab Navigation */}
    <nav style={{ marginTop: '2rem', borderBottom: '1px solid #ddd' }}>
      <Link to="/dashboard/groups/$groupId" params={{ groupId: trip.id }} style={tabStyle} activeProps={{ style: activeTabStyle }}>
        Expenses
      </Link>
      {/* <Link to="/dashboard/groups/$groupId/balances" params={{ groupId }} style={tabStyle} activeProps={{ style: activeTabStyle }}>
        Balances & Settle
      </Link> */}
    </nav>

    {/* 3. The Outlet for Tab Content */}
    <div style={{ marginTop: '2rem' }}>
      <Outlet />
    </div>
  </div>
  );
}
