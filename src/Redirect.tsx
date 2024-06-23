import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  target: string
}

export const Redirect = ({target}: RedirectProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(target)
  }, [navigate, target])
  return null
}