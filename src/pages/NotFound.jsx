import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman yang Anda cari tidak ditemukan."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Kembali ke Dashboard
        </Button>
      }
    />
  );
}

export default NotFound; 