export default function Footer() {
  return (
      <footer className="bg-[#20773B] text-white py-10 mt-16">
      <div className="container mx-auto px-4">

              <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-4">Follow Anil Kumar Yadav</h3>

                  <div className="flex justify-center gap-6">

                      {/* FACEBOOK - REAL ICON */}
                      <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          className="hover:opacity-70 transition"
                      >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                              <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.333C0 23.403.597 24 1.325 24h11.495v-9.333H9.691V11.31h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.316h3.587l-.467 3.357h-3.12V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .598 23.403 0 22.675 0z" />
                          </svg>
                      </a>

                      {/* INSTAGRAM - REAL ICON */}
                      <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          className="hover:opacity-70 transition"
                      >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.246 2.427.415a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.169.457.359 1.257.415 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.246 1.97-.415 2.427a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.457.169-1.257.359-2.427.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.246-2.427-.415a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.169-.457-.359-1.257-.415-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.246-1.97.415-2.427A4.92 4.92 0 0 1 3.801 2.943 4.92 4.92 0 0 1 5.58 1.79c.457-.169 1.257-.359 2.427-.415C8.273 1.317 8.653 1.305 12 1.305m0-1.305C8.691 0 8.263.012 7.004.07c-1.277.058-2.155.248-2.91.53A6.92 6.92 0 0 0 .6 2.597 6.92 6.92 0 0 0 .07 4.094c-.282.755-.472 1.633-.53 2.91C-.012 8.263 0 8.691 0 12s.012 3.737.07 5.004c.058 1.277.248 2.155.53 2.91A6.92 6.92 0 0 0 2.597 23.4a6.92 6.92 0 0 0 1.497.53c.755.282 1.633.472 2.91.53C8.263 24.012 8.691 24 12 24s3.737.012 5.004-.07c1.277-.058 2.155-.248 2.91-.53a6.92 6.92 0 0 0 1.497-.53 6.92 6.92 0 0 0 1.497-1.497c.282-.755.472-1.633.53-2.91.058-1.267.07-1.695.07-5.004s-.012-3.737-.07-5.004c-.058-1.277-.248-2.155-.53-2.91A6.92 6.92 0 0 0 21.403.6a6.92 6.92 0 0 0-1.497-.53c-.755-.282-1.633-.472-2.91-.53C15.737-.012 15.309 0 12 0z" />
                              <circle cx="12" cy="12" r="3.6" />
                              <circle cx="18" cy="6" r="1.4" />
                          </svg>
                      </a>

                      {/* YOUTUBE - REAL ICON */}
                      <a
                          href="https://www.youtube.com/"
                          target="_blank"
                          className="hover:opacity-70 transition"
                      >
                          <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a2.974 2.974 0 0 0-2.09-2.103C19.595 3.5 12 3.5 12 3.5s-7.595 0-9.408.583a2.974 2.974 0 0 0-2.09 2.103C0 8.018 0 12 0 12s0 3.982.502 5.814a2.974 2.974 0 0 0 2.09 2.103C4.405 20.5 12 20.5 12 20.5s7.595 0 9.408-.583a2.974 2.974 0 0 0 2.09-2.103C24 15.982 24 12 24 12s0-3.982-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                          </svg>
                      </a>

                  </div>
              </div>


                {/* BOTTOM SECTION */}
                <div className="mt-10 flex items-center justify-between text-gray-300 text-xs">

                    {/* LEFT SMALL BRANDING */}
                  <div
                      className="opacity-80 text-sm"
                      style={{
                          fontFamily: 'BankGothicLtBTLight',
                          letterSpacing: '0.11em',
                          textTransform: 'uppercase'
                      }}
                  >
                      A DNV ARC DIGITAL EXPERIENCE
                  </div>


                    {/* RIGHT COPYRIGHT */}
                    <div className="opacity-80">
                        © {new Date().getFullYear()} Anil Kumar Yadav • Indian National Congress
                    </div>

                </div>
            </div>
        </footer>
    );
}
