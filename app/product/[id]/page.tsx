
export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return <p>Product {id}</p>
}