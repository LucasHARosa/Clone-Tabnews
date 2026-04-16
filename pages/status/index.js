import useSWR from "swr";

async function fetchAPI(key) {
  const res = await fetch(key);
  const json = await res.json();
  return json;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>

      <UpdatedAt />
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const date = new Date(data?.updated_at).toLocaleString("pt-BR");
  return <div>Updated at: {date}</div>;
}

function Database() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  return (
    <div>
      <h2>Database</h2>
      <div>Version: {data?.dependecies.database.version}</div>
      <div>Max connections: {data?.dependecies.database.max_connections}</div>
      <div>Connections used: {data?.dependecies.database.connections_used}</div>
    </div>
  );
}
