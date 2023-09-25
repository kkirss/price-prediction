import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'

import { UpDownButtons } from './UpDownButtons'

describe('UpDownButtons', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const onUpClick = vi.fn()
  const onDownClick = vi.fn()

  it('handles up button click', async () => {
    const { getByRole } = render(() =>
      <UpDownButtons
        onUpClick={onUpClick}
        onDownClick={onDownClick}
      />
    )

    const upButton = getByRole('button', { name: 'Upward arrow' })
    expect(upButton).toBeInTheDocument()
    upButton.click()
    await Promise.resolve()

    expect(onUpClick).toHaveBeenCalledOnce()
  })
  it('handles down button click', async () => {
    const { getByRole } = render(() =>
      <UpDownButtons
        onUpClick={onUpClick}
        onDownClick={onDownClick}
      />
    )

    const downButton = getByRole('button', { name: 'Downward arrow' })
    expect(downButton).toBeInTheDocument()
    downButton.click()
    await Promise.resolve()

    expect(onDownClick).toHaveBeenCalledOnce()
  })
  it('ignores clicks when disabled', async () => {
    const { getByRole } = render(() =>
      <UpDownButtons
        onUpClick={onUpClick}
        onDownClick={onDownClick}
        disabled
      />
    )

    const upButton = getByRole('button', { name: 'Upward arrow' })
    const downButton = getByRole('button', { name: 'Downward arrow' })
    upButton.click()
    downButton.click()
    await Promise.resolve()

    expect(onUpClick).not.toHaveBeenCalled()
    expect(onDownClick).not.toHaveBeenCalled()
  })
})
