import { apiClient } from '@/repository/api'
import type { Country } from '@/types/misc'

export default function useCountry() {
  const countries = useState<Country[] | null>('countries', () => null)
  const loading = useState('countries-loading', () => false)
  const error = useState('countries-error', () => false)

  const fetchCountries = async () => {
    try {
      loading.value = true
      error.value = false
      const response = await apiClient.misc.fetchCountries()
      countries.value = response.status === 1 ? (response.msg ?? []) : []
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { countries, loading, error, fetchCountries }
}
