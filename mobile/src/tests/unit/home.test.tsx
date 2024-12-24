import { describe, expect, it } from '@jest/globals'
import { render } from '@testing-library/react-native'
import HelloWord from '../../components/HelloWord'

describe('<HelloWord />', () => {
  it("should render the message 'hello word 1'", () => {
    const { getByText } = render(<HelloWord message="hello word 1" />)

    expect(getByText('hello word 1')).toBeTruthy()
  })
})
