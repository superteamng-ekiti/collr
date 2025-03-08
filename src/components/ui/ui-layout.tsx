'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import * as React from 'react'
import {ReactNode, Suspense, useEffect, useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast'

import {AccountChecker} from '../account/account-ui'
import {ClusterChecker, ExplorerLink} from '../cluster/cluster-ui'
import {WalletButton} from '../solana/solana-provider'
import Image from "next/image";
import Logo from "../../../public/images/logo.png";

export function UiLayout({ children }: { children: ReactNode; }) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col">
      <header className={'bg-white border-b sticky top-0'}>
        <div
            className="navbar container justify-between dark:text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
          <div>
            <Link href="/" className="">
              <span className={'sr-only'}>Collr</span>
              <Image src={Logo} alt="logo" className="w-[90px] h-[30px]"/>
            </Link>
          </div>
          <div className="flex flex-1 items-center border rounded-full py-2 bg-transparent relative max-w-[18.875rem]">
            <div className={'absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'}>
                <svg className={'absolute w-4 h-4'} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8.11947 12.6667C11.065 12.6667 13.4528 10.2789 13.4528 7.33333C13.4528 4.38781 11.065 2 8.11947 2C5.17395 2 2.78613 4.38781 2.78613 7.33333C2.78613 10.2789 5.17395 12.6667 8.11947 12.6667Z"
                      stroke="#B9B9B9" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.7862 14L11.8862 11.1" stroke="#B9B9B9" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search for Collr Listing..."
                className="flex-1 pl-11 text-sm bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex-none space-x-2">
            <button className={'px-6 rounded-lg border text-sm uppercase text-[#404040] h-10 hover:shadow-sm hover:-translate-y-0.5 transition-all'}>Login</button>
            <button className={'px-6 rounded-lg bg-primary uppercase text-white text-sm h-10 hover:shadow-sm hover:-translate-y-0.5 transition-all'}>Sign Up</button>
            <WalletButton />
          </div>
        </div>
      </header>
      <ClusterChecker>
        <AccountChecker/>
      </ClusterChecker>
      <div className="flex-grow container">
        <Suspense
            fallback={
              <div className="text-center my-32">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
    </div>
  )
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode
  title: string
  hide: () => void
  show: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return
    if (show) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [show, dialogRef])

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button className="btn btn-xs lg:btn-md btn-primary" onClick={submit} disabled={submitDisabled}>
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      </div>,
    )
  }
}
